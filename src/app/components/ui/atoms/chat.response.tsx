"use client";

import {memo, NamedExoticComponent} from "react";
import {BounceLoader} from "react-spinners";

type Props = {
  loading: boolean;
  cnt: string;
    question: string;
};

export const ChatResponse: NamedExoticComponent<Props> = memo(
  ({loading, cnt, question}) => (
    <div
      id="chatgpt-response"
      className="min-w-full w-full mt-4 flex flex-col justify-start items-center space-y-6 lg:space-y-8"
    >
        <div
            className="w-full rounded-xl p-6 lg:p-8 bg-transparent border border-transparent max-h-[400px] overflow-auto no-scrollbar space-y-8">
            <p className="text-black italics font-inter text-sm lg:text-base text-end">
                {question}
            </p>
            <p className="font-inter text-sm lg:text-base font-semibold text-left text-black whitespace-pre-wrap text-pretty leading-6">
                {cnt}
            </p>
        </div>
    </div>
  ),
);

ChatResponse.displayName = "ChatResponse";
