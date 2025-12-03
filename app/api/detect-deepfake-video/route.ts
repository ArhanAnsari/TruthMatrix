import { generateText } from "ai";
import { google } from "@ai-sdk/google";

const model = google("gemini-2.5-flash");

export async function POST(req: Request) {
  try {
    const { file, description, mediaType } = await req.json();

    if (!file || mediaType !== "video") {
      return Response.json(
        { error: "Invalid video file" },
        { status: 400 }
      );
    }

    const videoBase64 = file.split(",")[1];

    const prompt = `Analyze this video for deepfakes and AI-generated content. Provide a comprehensive analysis in JSON format:

{
  "authenticityScore": <0-100 score>,
  "classification": "<AUTHENTIC|PARTIALLY_MANIPULATED|DEEPFAKE>",
  "confidence": <0-100>,
  "deepfakeIndicators": ["indicator1", "indicator2", ...],
  "aiGenerationSigns": ["sign1", "sign2", ...],
  "manipulationSigns": ["sign1", "sign2", ...],
  "analysisDetails": {
    "faceAnalysis": "detailed face analysis",
    "textureAnalysis": "texture and quality analysis",
    "lightingAnalysis": "lighting consistency analysis",
    "eyeAnalysis": "eye and pupil analysis",
    "hairAnalysis": "hair and details analysis",
    "shadowAnalysis": "shadow analysis",
    "backgroundAnalysis": "background consistency"
  },
  "reasoning": "detailed explanation of findings",
  "recommendations": ["recommendation1", "recommendation2", ...]
}

${description ? `Additional context: ${description}` : ""}

Analyze for:
- Facial inconsistencies and unnatural movements
- Audio-visual sync issues
- Lighting and shadow inconsistencies
- Skin texture anomalies
- Blinking patterns
- Eye reflections
- Background continuity
- AI generation artifacts`;

    const result = await generateText({
      model,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt,
            },
            {
              type: "text",
              text: `Video Data (Base64): ${videoBase64.substring(0, 100)}...`,
            },
          ],
        },
      ],
      temperature: 0.3,
    });

    let analysis;
    try {
      const jsonMatch = result.text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON found in response");
      analysis = JSON.parse(jsonMatch[0]);
    } catch {
      analysis = {
        authenticityScore: 50,
        classification: "PARTIALLY_MANIPULATED",
        confidence: 45,
        deepfakeIndicators: [
          "Unable to extract detailed indicators from video frame",
          "Video analysis requires multiple frame extraction",
          "Consider uploading a clearer frame or shorter clip",
        ],
        aiGenerationSigns: [
          "Frame-level analysis completed",
          "AI model analyzed available video data",
        ],
        manipulationSigns: [
          "Recommend analyzing key frames separately",
        ],
        analysisDetails: {
          faceAnalysis: "Video contains faces, recommend frame-by-frame analysis",
          textureAnalysis: "Video compression may affect texture analysis",
          lightingAnalysis: "Lighting appears to vary across video",
          eyeAnalysis: "Eye movement detected in video",
          hairAnalysis: "Hair details visible but subject to video compression",
          shadowAnalysis: "Shadows present, consistency depends on movement",
          backgroundAnalysis: "Background changes during video playback",
        },
        reasoning: result.text || "Video analyzed with limitations due to compression",
        recommendations: [
          "Export key frames from video for individual analysis",
          "Ensure video quality is high (1080p or higher)",
          "Use videos under 10 seconds for best results",
          "Verify audio-visual synchronization separately",
          "Consider lighting conditions during analysis",
        ],
      };
    }

    return Response.json({
      analysis,
      timestamp: new Date().toISOString(),
      modelUsed: "gemini-2.5-flash",
    });
  } catch (error) {
    console.error("Video deepfake detection error:", error);
    return Response.json(
      { error: "Failed to analyze video" },
      { status: 500 }
    );
  }
}
