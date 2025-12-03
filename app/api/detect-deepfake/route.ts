// app/api/detect-deepfake/route.ts
export const runtime = "nodejs";
export const maxDuration = 60;

import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      console.error("Missing GOOGLE_API_KEY environment variable");
      return NextResponse.json(
        { error: "API configuration error", code: "MISSING_API_KEY" },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const description = formData.get("description")?.toString() || "";

    if (!file) {
      return NextResponse.json({ error: "Image file required" }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large. Maximum 5MB allowed.", code: "FILE_TOO_LARGE" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const uint8 = new Uint8Array(arrayBuffer);

    const prompt = `
You are an expert deepfake detector.
Analyze the image and reply ONLY with valid JSON:

{
  "authenticityScore": number,
  "classification": "AUTHENTIC" | "LIKELY_FAKE" | "AI_GENERATED" | "MANIPULATED",
  "confidence": number,
  "deepfakeIndicators": [],
  "aiGenerationSigns": [],
  "manipulationSigns": [],
  "analysisDetails": {
    "faceAnalysis": "",
    "textureAnalysis": "",
    "lightingAnalysis": "",
    "eyeAnalysis": "",
    "hairAnalysis": "",
    "shadowAnalysis": "",
    "backgroundAnalysis": ""
  },
  "reasoning": "",
  "recommendations": []
}
    `;

    let result;
    try {
      result = await Promise.race([
        generateText({
          model: google("gemini-2.5-flash"),
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: prompt },
                { type: "image", image: uint8 }
              ]
            }
          ],
          temperature: 0.2,
        }),
        new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error("API request timeout after 50 seconds")),
            50000
          )
        )
      ]);
    } catch (timeoutError) {
      console.error("API timeout:", timeoutError);
      return NextResponse.json(
        { error: "Analysis took too long. Please try again.", code: "TIMEOUT" },
        { status: 504 }
      );
    }

    let raw: string | undefined;
    // Normalize and validate the result from generateText/Promise.race
    if (result && typeof result === "object" && "text" in result && typeof (result as any).text === "string") {
      raw = (result as any).text;
    } else if (typeof result === "string") {
      raw = result;
    } else {
      console.error("Unexpected API response:", result);
      return NextResponse.json(
        { error: "Invalid API response", code: "INVALID_RESPONSE" },
        { status: 500 }
      );
    }

    if (!raw || raw.trim().length === 0) {
      return NextResponse.json(
        { error: "Empty response from AI model", code: "EMPTY_RESPONSE" },
        { status: 500 }
      );
    }

    const jsonMatch = raw.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      console.error("Failed to extract JSON from response:", raw);
      return NextResponse.json({ error: "No JSON found", code: "INVALID_JSON", raw }, { status: 500 });
    }

    let analysis;
    try {
      analysis = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error("JSON parse error:", parseError, "Raw:", jsonMatch[0]);
      return NextResponse.json(
        { error: "Failed to parse analysis result", code: "PARSE_ERROR" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, analysis, timestamp: new Date().toISOString() });

  } catch (error) {
    console.error("detect-deepfake ERROR:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage, code: "INTERNAL_ERROR" }, { status: 500 });
  }
}
