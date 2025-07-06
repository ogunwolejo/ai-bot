"use client";

import {
  Context,
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

type UniversalPromptContextType = {
  handleAcceptPrompt: (e: string) => void;
  promptValue: string;
  promptHistory: string[];
};

const UniversalPromptCtx = createContext<UniversalPromptContextType | undefined>(undefined);

export const useUniversalPromptCtx = () => {
  const ctx = useContext(UniversalPromptCtx);
  if (!ctx) {
    throw new Error("useUniversalPromptCtx must be used within a UniversalPromptProvider");
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
  };

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
