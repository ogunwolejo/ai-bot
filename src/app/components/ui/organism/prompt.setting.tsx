"use client";

import {Textarea} from "@/app/components/ui/atoms/textarea";
import {Button} from "@/app/components/ui/atoms/button";
import {
  ChangeEvent,
  ChangeEventHandler,
  memo,
  NamedExoticComponent,
  useState,
} from "react";
import {useUniversalPromptCtx} from "@/context/universal";
import {ClipLoader} from "react-spinners";

export const PromptSetting: NamedExoticComponent = memo(() => {
  const {loading, promptHistory, handleAcceptPrompt, promptValue} =
    useUniversalPromptCtx();
  const [universalPrompt, setUniversalPrompt] = useState<string>("");
  const handleUpdateUniversalPrompt: ChangeEventHandler<HTMLTextAreaElement> = (
    e: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setUniversalPrompt(e.target.value);
  };

  return (
    <div
      id="universal-prompty"
      className="w-full h-full flex flex-col justify-center items-center space-y-6"
    >
      <h1 className="text-xl font-bold text-center text-muted font-inter tracking-widest text-xl lg:text-2xl xl:text-3xl capitalize">
        Create universal prompt
      </h1>
      <div className="w-auto md:w-[80%] lg:w-[60%] xl:w-[40%] mx-auto rounded-xl border-2 border-gray-300 p-1">
        <Textarea
          className="w-full h-[125px] bg-transparent !border-none font-roboto font-normal text-sm lg:text-base"
          onChange={handleUpdateUniversalPrompt}
          placeholder="new prompt ........"
        />
      </div>
      <div className="flex justify-end items-center w-auto md:w-[80%] lg:w-[60%] xl:w-[40%] mx-auto gap-4">
        <Button
          type="button"
          className="rounded-xl capitalize bg-blue-600 text-white font-semibold w-[250px] h-[60px]"
          onClick={() => {
            handleAcceptPrompt(universalPrompt);
          }}
        >
          {loading ? (
            <ClipLoader loading={loading} size={20} />
          ) : (
            "Create new prompt"
          )}
        </Button>
        <Button
            type="button"
            className="rounded-xl capitalize outline-red-600 border-red-600 ring-2 ring-red-600 outline-2 bg-white text-red-600 font-semibold w-[150px] h-[60px]"
            onClick={() => {
              setUniversalPrompt("")
              handleAcceptPrompt("");
            }}
        >
          {loading ? (
              <ClipLoader loading={loading} size={20} />
          ) : (
              "Reset"
          )}
        </Button>
      </div>

      {promptValue.trim().length && promptValue === universalPrompt ? (
        <div className="text-sm italics font-semibold font-roboto text-green-500 capitalize w-full inline-flex justify-center items-center w-auto md:w-[80%] lg:w-[60%] xl:w-[40%] mx-auto">
          <p>prompt has been updated</p>
        </div>
      ) : null}

      {/*{promptHistory.length ? (*/}
      {/*  <>*/}
      {/*    <h6 className="text-sm text-center font-bold text-black text-gray-200">*/}
      {/*      Prompt history*/}
      {/*    </h6>*/}
      {/*    <div*/}
      {/*      id="prompt-history"*/}
      {/*      className="space-y-2 grid grid-col-2 lg:grid-cols-4 gap-4"*/}
      {/*    >*/}
      {/*      {promptHistory.slice(0, 8).map((history, idx) => (*/}
      {/*        <div*/}
      {/*            onClick={() => {*/}
      {/*              handleAcceptPrompt(history);*/}
      {/*            }}*/}
      {/*          role="button"*/}
      {/*          key={idx}*/}
      {/*          className="cursor-pointer rounded-lg h-20 max-w-[300px] text-start truncate flex justify-center items-center px-4 py-4 bg-gray-500/40 text-black font-semibold font-roboto text-xs lg:text-sm"*/}
      {/*        >*/}
      {/*          {history}*/}
      {/*        </div>*/}
      {/*      ))}*/}
      {/*    </div>*/}
      {/*  </>*/}
      {/*) : null}*/}
    </div>
  );
});
