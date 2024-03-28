import { useContext } from "react";
import { Bars3BottomRightIcon } from "@heroicons/react/20/solid";
import { AppContext } from "../../context/AppContext";

export default function Header() {
  const { sidebarOpen, setSidebarOpen } = useContext(AppContext);

  return (
    <header className="p-6 bg-gradient-to-r from-pink-400 to-pink-600 border-b-2 border-pink-500 shadow-neon shadow-pink-500/60">
      <div className="flex justify-between items-center max-w-screen-2xl mx-auto">
        <h1 className="relative p-2 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-rose-800">
          Siam Silhouette
        </h1>
        {!sidebarOpen && (
          <button
            type="button"
            className="relative p-2 rounded-md bg-gradient-to-r from-rose-400 to-rose-600 shadow-neon shadow-rose-500/60 text-pink-200 hover:text-rose-800"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="absolute -inset-2.5" />
            <span className="sr-only">Close panel</span>
            <Bars3BottomRightIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        )}
      </div>
    </header>
  );
}
