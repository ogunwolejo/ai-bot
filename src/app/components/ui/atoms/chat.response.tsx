"use client";

import {memo, NamedExoticComponent} from "react";
import {BounceLoader} from "react-spinners";

type Props = {
  loading: boolean;
  cnt: string;
};

export const ChatResponse: NamedExoticComponent<Props> = memo(
  ({loading, cnt}) => (
    <div
      id="chatgpt-response"
      className="w-full mx-auto bg-transparent mt-4 flex flex-col justify-start items-center"
    >
      <div className="rounded-xl p-6 lg:p-8 bg-gray-400 border border-gray-400 max-h-[400px] overflow-y-auto">
        <p className="font-inter text-sm lg:text-base font-semibold text-start text-black whitespace-pre-wrap text-pretty leading-6">
          {cnt}
          {/* loading ? (*/}
          {/*<BounceLoader*/}
          {/*  loading={true}*/}
          {/*  size={30}*/}
          {/*  color="#000000"*/}
          {/*  className="bg-black rounded-full"*/}
          {/*/>{" "}*/}
          {/*: <></>*/}
        </p>
      </div>
    </div>
  ),
);

ChatResponse.displayName = "ChatResponse";
