"use client";

import {
  Context,
  createContext,
  PropsWithChildren,
  useContext, useEffect,
  useState,
} from "react";
import {getLocalStorageValue, removeLocalStorageValue, setLocalStorageValue} from "@/utils/local-storage";
import constants from "@/utils/constants";

type UniversalPromptContextType = {
  handleAcceptPrompt: (e: string) => void;
  promptValue: string;
  promptHistory: string[];
};

const UniversalPromptCtx = createContext<
  UniversalPromptContextType | undefined
>(undefined);

export const useUniversalPromptCtx = () => {
  const ctx = useContext(UniversalPromptCtx);
  if (!ctx) {
    throw new Error(
      "useUniversalPromptCtx must be used within a UniversalPromptProvider",
    );
  }
  return ctx;
};

export const UniversalPromptProvider = ({children}: PropsWithChildren) => {
  const [uPrompt, setUPrompt] = useState<string>("");
  const [promptHistory, setPromptHistory] = useState<string[]>([]);
  const handleUpdatePrompt = (value: string) => {
    setUPrompt(value);
    setPromptHistory(cur => {
      if (promptHistory.length) {
        return [value, ...cur];
      } else {
        return [value];
      }
    });

    // if the value is an empty string
    if(!value.trim().length) {
      removeLocalStorageValue(constants.GlobalPrompt);
      return;
    }

    setLocalStorageValue<string>(constants.GlobalPrompt, value);
  };

  useEffect(() => {
    // retrieve and update the uPrompt if there is any in the localStorage
    const value = getLocalStorageValue<string>(constants.GlobalPrompt);
    if(value != null) {
      setUPrompt(value);
    }
  }, []);

  return (
    <UniversalPromptCtx.Provider
      value={{
        handleAcceptPrompt: handleUpdatePrompt,
        promptHistory,
        promptValue: uPrompt,
      }}
    >
      {children}
    </UniversalPromptCtx.Provider>
  );
};
