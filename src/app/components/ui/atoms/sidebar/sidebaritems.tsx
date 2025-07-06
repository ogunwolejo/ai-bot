"use client";

import {NamedExoticComponent, memo} from "react";

export const SideBarItems: NamedExoticComponent<{content: string}> = memo(
  ({content}) => {
    return (
      <div className="cursor-pointer text-xs lg:text-sm font-semibold font-roboto text-white px-2 py-1 text-white text-wrap overflow-hidden text-ellipsis h-12">
        {content}
      </div>
    );
  },
);
