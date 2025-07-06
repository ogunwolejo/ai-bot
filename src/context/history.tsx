"use client";

import {
  useContext,
  Context,
  PropsWithChildren,
  useState,
  createContext,
} from "react";

const HistoryCtx: Context<
  | {
      newHistories: (e: string) => void;
      messageHistories: string[];
      globalPrompt: string;
    }
  | undefined
> = createContext(undefined);

export const useHistory = () => {
  const ctx = useContext(HistoryCtx);
  if (ctx === undefined) {
    throw new Error("cannot be undefiend!!");
  }

  return ctx;
};

export const HistoryProvider = ({children}: PropsWithChildren) => {
  const [messages, setMessages] = useState<string[]>([]);
  const updateMessages = (msg: string) => {
    setMessages(cur => [msg, ...cur]);
  };

  return (
    <HistoryCtx.Provider
      value={{messageHistories: messages, newHistories: updateMessages}}
    >
      {children}
    </HistoryCtx.Provider>
  );
};
