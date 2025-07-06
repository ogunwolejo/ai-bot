"use client"


import {ChangeEvent, memo, NamedExoticComponent, RefObject, useState} from "react";
import {Textarea} from "@/app/components/ui/atoms/textarea";
import {Button} from "@/app/components/ui/atoms/button";
import clsx from "clsx";
import {ArrowUpIcon} from "@heroicons/react/24/outline";

type Props = {
    initialValue?:  string;
    handleModelCall: (e) => Promise<void>;
    updateMessage: (e: ChangeEvent<HTMLTextAreaElement>) => void
    setMessage:  (value: (((prevState: string) => string) | string)) => void;
}

export const PromptBox: NamedExoticComponent<Props> = memo(({initialValue = "", handleModelCall, updateMessage, setMessage}) => {
    const [value, setValue] = useState(initialValue);
    const hasValue = value.trim().length > 0;

    const handleMakeChgptCall = async () => {
        await handleModelCall();
        setValue(""); // reset value
    }


    return (
        <div className="relative md:w-[80%] lg:w-[60%] xl:w-[40%] mx-auto rounded-xl border-2 border-gray-300 p-1 bg-white">
            <Textarea
                value={value}
                className="w-full h-[125px] bg-transparent !border-none font-roboto font-normal text-sm lg:text-base"
                onChange={(e) => {
                    setValue(e.target.value);
                    updateMessage(e);
                }}
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
                <ArrowUpIcon
                    className={clsx(
                        "size-4 lg:size-5",
                        hasValue ? "text-white" : "text-black",
                    )}
                />
            </Button>
        </div>
    );
})

PromptBox.displayName = "PromptBox";
