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
import {Textarea} from "@/app/components/ui/atoms/textarea";
import {Button} from "@/app/components/ui/atoms/button";
import {ArrowUpIcon} from "@heroicons/react/24/outline";
import clsx from "clsx";
import {ChatResponse} from "@/app/components/ui/atoms/chat.response";
import {useHistory} from "@/context/history";
import {useUniversalPromptCtx} from "@/context/universal";

{
  /** TODO: Histories */
}
{
  /** ............... TODO: Press the enter key ...................... **/
}

const Chatbot: NamedExoticComponent = memo(() => {
  const {newHistories} = useHistory();

  const [message, setMessage] = useState<string>("");
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
          newHistories(fullText);
          setMessage("");
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

  return (
    <div className="flex flex-col justify-center items-center h-full w-full space-y-6 lg:space-y-8">
      <h1 className="text-xl font-bold text-center text-muted font-inter tracking-widest text-xl lg:text-2xl xl:text-3xl">
        AI Chatbot
      </h1>

      <div className="relative md:w-[80%] lg:w-[60%] xl:w-[40%] mx-auto rounded-xl border-2 border-gray-300 p-1">
        <Textarea
          className="w-full h-[125px] bg-transparent !border-none font-roboto font-normal text-sm lg:text-base"
          onChange={updateMessage}
        />
        <Button
          type="button"
          disabled={!message.trim().length}
          className={clsx(
            "rounded-full size-8 lg:size-12  flex justify-center items-center absolute right-0 bottom-0 mx-2 mb-1 z-10 p-2",
            message.trim().length ? "bg-black" : "bg-gray-300",
          )}
          onClick={handleModelCall}
        >
          <ArrowUpIcon
            className={clsx(
              "size-4 lg:size-5",
              message.trim().length ? "text-white" : "text-black",
            )}
          />
        </Button>
      </div>

      <div
        id="chat-response-container"
        className="space-y-4 overflow-y-auto w-auto md:w-[70%] xl:w-[60%] mx-auto"
      >
        {airesponse.length ? (
          <ChatResponse loading={loading} cnt={airesponse} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
});

Chatbot.displayName = "Chatbot";
export default Chatbot;
