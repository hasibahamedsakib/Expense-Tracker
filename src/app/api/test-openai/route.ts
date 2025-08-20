import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function GET(request: NextRequest) {
  try {
    // Initialize OpenAI with the API key
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        status: "error",
        message: "OpenAI API key not found in environment variables",
      });
    }

    console.log("Testing OpenAI API key...");

    // Test with a simple completion
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant. Respond with just 'API key is working!' if you receive this test message.",
        },
        {
          role: "user",
          content: "Test message",
        },
      ],
      max_tokens: 20,
      temperature: 0,
    });

    const response = completion.choices[0]?.message?.content;

    return NextResponse.json({
      status: "success",
      message: "OpenAI API key is working!",
      response: response,
      model: completion.model,
      usage: completion.usage,
    });
  } catch (error: any) {
    console.error("OpenAI API test failed:", error);

    let errorMessage = "Unknown error";
    let errorCode = "unknown";

    if (error.status === 401) {
      errorMessage = "Invalid API key - please check your OpenAI API key";
      errorCode = "invalid_api_key";
    } else if (error.status === 429) {
      errorMessage = "Rate limit exceeded or insufficient quota";
      errorCode = "rate_limit_exceeded";
    } else if (error.code === "insufficient_quota") {
      errorMessage = "OpenAI API quota exceeded - need to add credits";
      errorCode = "insufficient_quota";
    } else {
      errorMessage = error.message || "API request failed";
      errorCode = error.code || "api_error";
    }

    return NextResponse.json({
      status: "error",
      message: errorMessage,
      code: errorCode,
      details: {
        status: error.status,
        code: error.code,
        type: error.type,
      },
    });
  }
}
