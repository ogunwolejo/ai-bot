"use client";

import {
  NamedExoticComponent,
  memo,
  useState,
  ChangeEventHandler,
  ChangeEvent,
  useRef,
  useEffect,
} from "react";
import clsx from "clsx";
import {ChatResponse} from "@/app/components/ui/atoms/chat.response";
import {useHistory} from "@/context/history";
import {useUniversalPromptCtx} from "@/context/universal";
import {PromptBox} from "@/app/components/ui/atoms/promptBox";
import {HistoryData} from "@/app/components/ui/organism/HistoryData";

const Chatbot: NamedExoticComponent = memo(() => {
  const {newHistories, messageHistories} = useHistory();

  const [message, setMessage] = useState<string>("");
  const [sentMessage, setSentMessage] = useState<string>("");
  const {promptValue} = useUniversalPromptCtx();
  const [airesponse, setAiResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const responseRef = useRef<string>("");
  const endRef = useRef<HTMLDivElement>(null);

  const updateMessage: ChangeEventHandler<HTMLTextAreaElement> = (
    e: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({behavior: "smooth"});
  }, [airesponse]);

  const handleModelCall = async () => {
    try {
      setLoading(true);
      setAiResponse("");
      responseRef.current = "";

      setSentMessage(message);

      const response = await fetch("/api/chatgpt", {
        method: "POST",
        keepalive: true,
        body: JSON.stringify({
          message: message,
          universalPrompt: promptValue,
        }),
      });

      if (!response.body) {
        setAiResponse("No response body.");
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let fullText = "";
      let updateTimer: NodeJS.Timeout | null = null;

      while (true) {
        const {value, done} = await reader.read();
        if (done) {
          newHistories({
            answer: fullText,
            question: message,
          });
          break;
        }

        const chunk = decoder.decode(value, {stream: true});
        fullText += chunk;
        responseRef.current += chunk;

        if (!updateTimer) {
          updateTimer = setTimeout(() => {
            setAiResponse(responseRef.current);
            updateTimer = null;
          }, 40);
        }
      }
    } catch (err) {
      setAiResponse(
        `Error: ${err instanceof Error ? err.message : String(err)}`,
      );
    } finally {
      setLoading(false);
    }
  };
  const hasContent = airesponse.length || messageHistories.length;

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <h1
        className={clsx(
          "text-xl font-bold text-center text-muted font-inter tracking-widest text-xl lg:text-2xl xl:text-3xl",
          hasContent ? "hidden" : "mb-2",
        )}
      >
        AI Chatbot
      </h1>

      <div
        className={clsx(
          hasContent
            ? "fixed bottom-0 left-0 z-50 w-full  pl-24 pt-3 pr-3 pb-1"
            : "w-full relative",
        )}
      >
        <PromptBox
          handleModelCall={handleModelCall}
          initialValue={message}
          updateMessage={updateMessage}
          setMessage={setMessage}
          loading={loading}
        />
      </div>

      <div
        className={` w-full overflow-y-auto ${hasContent ? "pb-24 flex-1" : ""}`}
      >
        <div className="space-y-6 w-auto md:w-[60%] xl:w-[40%] mx-auto min-h-full">
          <HistoryData
            messageHistories={messageHistories}
            airesponse={airesponse}
          />

          {airesponse.length ? (
            <ChatResponse
              loading={loading}
              cnt={airesponse}
              question={sentMessage}
            />
          ) : null}

          <div ref={endRef} />
        </div>
      </div>
    </div>
  );
});

Chatbot.displayName = "Chatbot";
export default Chatbot;
