// app/api/detect-news/route.ts
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

    const { text, source } = await request.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: "Please provide text to analyze" }, { status: 400 });
    }

    if (text.length > 5000) {
      return NextResponse.json(
        { error: "Text too long. Maximum 5000 characters allowed." },
        { status: 400 }
      );
    }

    const prompt = `
You are an expert misinformation detector.
Analyze the text below and respond ONLY with valid JSON.

TEXT:
${text}

SOURCE:
${source || "unknown"}

JSON ONLY:
{
  "credibilityScore": number,
  "classification": "LIKELY_TRUE" | "LIKELY_FALSE" | "UNVERIFIABLE",
  "confidence": number,
  "keyFindings": [],
  "redFlags": [],
  "factsToVerify": [],
  "reasoning": "",
  "recommendations": []
}
    `;

    let result: { text?: unknown } | undefined;
    try {
      result = (await Promise.race([
        generateText({
          model: google("gemini-2.5-flash"),
          messages: [
            { role: "user", content: [{ type: "text", text: prompt }] }
          ],
          temperature: 0.2,
        }),
        new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error("API request timeout after 50 seconds")),
            50000
          )
        )
      ])) as { text?: unknown };
    } catch (timeoutError) {
      console.error("API timeout:", timeoutError);
      return NextResponse.json(
        { error: "Analysis took too long. Please try again.", code: "TIMEOUT" },
        { status: 504 }
      );
    }

    const raw = String(result?.text ?? "");

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
    console.error("detect-news ERROR:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage, code: "INTERNAL_ERROR" }, { status: 500 });
  }
}
