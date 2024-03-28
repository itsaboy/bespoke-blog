import { Fragment, useState, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import SidebarNav from "./SidebarNav";
import { AppContext } from "../../context/AppContext";

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useContext(AppContext);
  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setSidebarOpen}>
        <div className="fixed inset-0" />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full sm:pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="p-2 pointer-events-auto w-screen max-w-lg px-6 bg-gradient-to-r from-rose-600 to-rose-800 border-l-2 border-rose-500 shadow-neon shadow-rose-500/60">
                  <div className="flex h-full flex-col bg-transparent py-6">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-semibold leading-6 text-pink-200">
                          Navigation Menu
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative p-2 rounded-md bg-gradient-to-r from-pink-400 to-pink-600 shadow-neon shadow-pink-500/60 text-pink-200 hover:text-rose-800"
                            onClick={() => setSidebarOpen(false)}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative my-16 flex-1 px-4 sm:px-6">
                      <SidebarNav />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
