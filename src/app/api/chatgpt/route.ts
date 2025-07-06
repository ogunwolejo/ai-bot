import {NextRequest} from "next/server";
import OpenAI from "openai";
import {ChatCompletionMessageParam} from "openai/resources/chat/completions";

const client = new OpenAI({
  apiKey: process.env.CHAT_GPT_PROJECT_KEY!,
});

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {universalPrompt, message} = body;

  const messages: ChatCompletionMessageParam[] = universalPrompt
    ? [
        {role: "system", content: universalPrompt},
        {role: "user", content: message},
      ]
    : [{role: "user", content: message}];

  const stream = await client.chat.completions.create({
    model: "gpt-4",
    messages,
    stream: true,
  });

  const encoder = new TextEncoder();
  const readableStream = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const content = chunk.choices?.[0]?.delta?.content;
        if (content) {
          controller.enqueue(encoder.encode(content));
        }
      }
      controller.close();
    },
  });

  return new Response(readableStream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
