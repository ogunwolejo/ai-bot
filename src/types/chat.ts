export type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type ChatbotProps = {
  initialMessages?: Message[];
  initialUniversalPrompt?: string;
};
