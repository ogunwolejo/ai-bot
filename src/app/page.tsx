"use client";

import Chatbot from "@/app/components/ui/organism/chatbox";
import MainLayout from "@/app/components/ui/organism/main.layout";

export default function Home() {
  return (
    <MainLayout>
      <Chatbot />
    </MainLayout>
  );
}
