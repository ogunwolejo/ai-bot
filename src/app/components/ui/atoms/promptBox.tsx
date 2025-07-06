"use client";

import {
  ChangeEvent,
  KeyboardEventHandler,
  memo,
  NamedExoticComponent,
  useState,
} from "react";
import {Textarea} from "@/app/components/ui/atoms/textarea";
import {Button} from "@/app/components/ui/atoms/button";
import clsx from "clsx";
import {ArrowUpIcon} from "@heroicons/react/24/outline";
import {useUniversalPromptCtx} from "@/context/universal";
import {ClipLoader} from "react-spinners";

type Props = {
  initialValue?: string;
  handleModelCall: (e) => Promise<void>;
  updateMessage: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  setMessage: (value: ((prevState: string) => string) | string) => void;
  loading: boolean;
};

export const PromptBox: NamedExoticComponent<Props> = memo(
  ({
    initialValue = "",
    handleModelCall,
    updateMessage,
    setMessage,
    loading,
  }) => {
    const {promptValue, handleAcceptPrompt} = useUniversalPromptCtx();
    const [value, setValue] = useState<string>(initialValue);
    const hasValue = value.trim().length > 0;
    const hasGlobalPrompt = promptValue.trim().length > 0;

    const handleResetPrompt = () => {
      handleAcceptPrompt(""); // remove the current value and default it to an empty string
    };

    const handleMakeChgptCall = async () => {
      await handleModelCall();
      setValue(""); // reset value
    };

    const handlePressKey: KeyboardEventHandler = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault(); // Prevents a new line
        setMessage(value);
        handleMakeChgptCall();
      }
    };

    return (
      <div className="relative md:w-[80%] lg:w-[60%] xl:w-[40%] mx-auto rounded-xl border-2 border-gray-300 p-1 bg-white">
        <Textarea
          value={value}
          className={clsx(
            "w-full h-[125px] bg-transparent !border-none font-roboto font-normal text-sm lg:text-base",
            hasGlobalPrompt && "textarea-indicator-pulse",
          )}
          onChange={e => {
            setValue(e.target.value);
            updateMessage(e);
          }}
          onKeyDown={handlePressKey}
        />

        <Button
          type="button"
          disabled={!hasValue}
          className={clsx(
            "rounded-full size-8 lg:size-12  flex justify-center items-center absolute right-0 bottom-0 mx-2 mb-1 z-100 p-2",
            hasValue ? "bg-black" : "bg-gray-300",
          )}
          onClick={handleMakeChgptCall}
        >
          {loading ? (
            <ClipLoader size={20} loading={loading} color="#FFFFFF" />
          ) : (
            <ArrowUpIcon
              className={clsx(
                "size-4 lg:size-5",
                hasValue ? "text-white" : "text-black",
              )}
            />
          )}
        </Button>

        <Button
          type="button"
          onClick={handleResetPrompt}
          disabled={!hasGlobalPrompt}
          className="bg-transparent rounded-full absolute left-2 bottom-3 px-2 py-1.2 bg-gray-300 text-xs lg:text-sm font-inter font-medium h-5 text-red-300 hover:text-red-600"
        >
          Clear prompt
        </Button>
      </div>
    );
  },
);

PromptBox.displayName = "PromptBox";
