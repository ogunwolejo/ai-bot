"use client";

import Link from "next/link";
import {Fragment, memo} from "react";
import {useHistory} from "@/context/history";
import {SideBarItems} from "@/app/components/ui/atoms/sidebar/sidebaritems";
import {useRouter} from "next/router";

const SideBar = memo(() => {
  const {messageHistories} = useHistory();
  return (
    <aside className="w-64 bg-gray-500 text-white p-6 h-full">
      <nav className="flex flex-col h-full justify-between items-start">
        <div id="history" className="flex-1 overflow-y-auto space-y-3">
          <Link
            href="/"
            className="text-white text-lg capitalize hover:font-semibold"
            prefetch
          >
            New Chats
          </Link>
          {messageHistories.map((history, idx) => (
            <Fragment key={idx}>
              <SideBarItems content={history} />
            </Fragment>
          ))}
        </div>
        <Link
          href="/settings"
          className="text-white text-lg hover:text-xl hover:font-semibold capitalize"
          prefetch
        >
          ⚙️ Settings
        </Link>
      </nav>
    </aside>
  );
});

export default SideBar;
