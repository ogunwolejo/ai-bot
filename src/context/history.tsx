"use client";

import {
  useContext,
  Context,
  PropsWithChildren,
  useState,
  createContext,
} from "react";

type Message = {answer: string; question: string};

const HistoryCtx = createContext<
  | {
      newHistories: (e: Message) => void;
      messageHistories: Message[];
    }
  | undefined
>(undefined);

export const useHistory = () => {
  const ctx = useContext(HistoryCtx);
  if (ctx === undefined) {
    throw new Error("cannot be undefiend!!");
  }

  return ctx;
};

export const HistoryProvider = ({children}: PropsWithChildren) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const updateMessages = (msg: Message) => {
    setMessages(cur => [...cur, msg]);
  };

  return (
    <HistoryCtx.Provider
      value={{messageHistories: messages, newHistories: updateMessages}}
    >
      {children}
    </HistoryCtx.Provider>
  );
};
