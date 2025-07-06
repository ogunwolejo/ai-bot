"use client";

import {Fragment, memo, NamedExoticComponent} from "react";
import {ChatHistory} from "@/app/components/ui/atoms/chat.history";

type Props = {
  messageHistories: Array<{answer: string; question: string}>;
  airesponse: string;
};

export const HistoryData: NamedExoticComponent<Props> = memo(
  ({messageHistories, airesponse}) => {
    return (
      <Fragment>
        {messageHistories
          .filter(msg => msg.answer !== airesponse)
          .map((msgHistory, idx) => (
            <Fragment key={idx}>
              <ChatHistory
                cnt={msgHistory.answer}
                question={msgHistory.question}
              />
            </Fragment>
          ))}
      </Fragment>
    );
  },
);

HistoryData.displayName = "HistoryData";
