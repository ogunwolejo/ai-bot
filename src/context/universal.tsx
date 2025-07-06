"use client";

import {
  Context,
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type Props = {
  handleAcceptPrompt: (e: string) => void;
  promptValue: string;
  promptHistory: string[];
} | null;

const UniversalPromptCtx: Context<Props> = createContext({
  promptHistory: [],
  promptValue: "",
  handleAcceptPrompt: e => {},
  loading: false,
});

export const useUniversalPromptCtx = () => {
  return useContext(UniversalPromptCtx);
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
