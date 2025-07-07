"use client";

import Link from "next/link";
import {Fragment, memo, useState} from "react";
import {useHistory} from "@/context/history";
import {SideBarItems} from "@/app/components/ui/atoms/sidebar/sidebaritems";
import {XMarkIcon, Bars3Icon} from "@heroicons/react/24/outline";
import clsx from "clsx";

const SideBar = memo(() => {
  const {messageHistories} = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const handleDrawerClose = () => {
    setIsOpen(false);
  }

  const handleDrawerOpen = () => {
    setIsOpen(true);
  }

  return (
    <Fragment>
      <button
        className={clsx("lg:hidden fixed top-4 left-4 z-50 p-2 bg-transparent border-none rounded-md", isOpen ? "hidden" : "")}
        onClick={handleDrawerOpen}
      >
        <Bars3Icon className="w-6 h-6 text-black stroke-black" />
      </button>

      <div
        className={`fixed inset-0 z-40 transition-transform transform bg-black/20  lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={handleDrawerClose}
      >
        <aside
          className="w-64 h-full bg-gray-800 shadow-lg z-75 text-white p-4"
          onClick={e => e.stopPropagation()}
        >
          <nav className="w-full flex flex-col h-full justify-between items-start">
            <div className="flex-1 w-full overflow-y-auto space-y-3 no-scrollbar">
              <div className="flex justify-betweeen items-center mb-12 w-full">
                <Link
                    href="/"
                    className="text-white text-lg capitalize hover:font-semibold grow"
                    prefetch
                >
                  New Chats
                </Link>
                <button
                    type="button"
                    className="bg-transparent border-none"
                    onClick={handleDrawerClose}
                >
                  <XMarkIcon className="w-6 h-6 text-white"/>
                </button>
              </div>
              {messageHistories.map((history, idx) => (
                  <Fragment key={idx}>
                    <SideBarItems content={history.answer}/>
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
      </div>

      <aside className="hidden lg:block lg:w-64 bg-gray-800 text-white px-2 py-4 h-full">
        <nav className="flex flex-col h-full justify-between items-start">
          <div className="flex-1 overflow-y-auto space-y-3 p-2 no-scrollbar">
            <Link
              href="/"
              className="text-white text-lg capitalize hover:font-semibold mb-12"
              prefetch
            >
              New Chats
            </Link>
            {messageHistories.map((history, idx) => (
              <Fragment key={idx}>
                <SideBarItems content={history.answer} />
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
    </Fragment>
  );
});

export default SideBar;
