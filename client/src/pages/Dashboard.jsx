import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import NewBlog from "../components/Dashboard/NewBlog";
import NewImage from "../components/Dashboard/NewImage";
import DeleteBlog from "../components/Dashboard/DeleteBlog";
import DeleteImage from "../components/Dashboard/DeleteImage";
import logoutIcon from "../assets/icons/logout.svg";
import dayjs from "dayjs";

const items = [
  {
    title: "Create a Blog Post",
    description: "Another to-do system you’ll try but eventually give up on.",
    icon: PlusIcon,
    background: "bg-gradient-to-r from-pink-500 to-pink-700 border-b-2 border-pink-500 border-2",
    action: "new blog",
  },
  {
    title: "Create an Image Post",
    description: "Stay on top of your deadlines, or don’t — it’s up to you.",
    icon: PlusIcon,
    background: "bg-gradient-to-r from-pink-500 to-pink-700 border-b-2 border-pink-500 border-2",
    action: "new image",
  },
  {
    title: "Delete a Blog Post",
    description: "Great for mood boards and inspiration.",
    icon: MinusIcon,
    background: "bg-gradient-to-r from-rose-500 to-rose-700 border-b-2 border-rose-500 border-2",
    action: "delete blog",
  },
  {
    title: "Delete an Image Post",
    description: "Track tasks in different stages of your project.",
    icon: MinusIcon,
    background: "bg-gradient-to-r from-rose-500 to-rose-700 border-b-2 border-rose-500 border-2",
    action: "delete image",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Doashboard() {
  const [newAction, setNewAction] = useState(null);

  const { user } = useAuthContext();

  const { logout } = useLogout();

  return (
    <>
      {user && user.role === "admin" ? (
        <div className="pt-32 px-4 overflow-hidden sm:pt-40 pb-24 max-w-5xl mx-auto">
          <h2 className="text-base font-semibold leading-6 text-pink-300">
            Welcome back {user.username}!
          </h2>
          <p className="mt-1 text-sm text-rose-300">
            {dayjs().format("dddd, MMMM D, YYYY")}
          </p>
          <ul
            role="list"
            className="mt-6 grid grid-cols-1 gap-6 border-b border-t border-pink-200 py-6"
          >
            {items.map((item, itemIdx) => (
              <li
                key={itemIdx}
                className="flow-root"
                onClick={() => setNewAction(item.action)}
              >
                <div className="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-pink-500 hover:bg-rose-800/80">
                  <div
                    className={classNames(
                      item.background,
                      "flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg"
                    )}
                  >
                    <item.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-pink-200">
                      <a href="#" className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        <span>{item.title}</span>
                        <span aria-hidden="true"> &rarr;</span>
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-rose-200">
                      {item.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="my-16 mx-auto max-w-3xl rounded-2xl bg-gradient-to-r from-rose-600 to-rose-800 border-l-2 border-rose-500 shadow-neon shadow-rose-500/60">
            {newAction === "new blog" ? (
              <NewBlog />
            ) : newAction === "new image" ? (
              <NewImage />
            ) : newAction === "delete blog" ? (
              <DeleteBlog />
            ) : newAction === "delete image" ? (
              <DeleteImage />
            ) : null}
          </div>
          <div className="mt-8 flex justify-center items-center">
            <button
              className="px-4 sm:px-10 py-2 bg-gradient-to-l from-pink-200 to-pink-400 border-2 border-pink-400 rounded-2xl shadow-neon shadow-pink-400/60 hover:bg-gradient-to-r hover:shadow-neon hover:shadow-pink-200/60 hover:border-pink-200"
              onClick={() => logout()}
            >
              <div className="flex justify-between items-center text-sm sm:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-rose-800">
                Logout
                <img
                  src={logoutIcon}
                  className="hidden sm:block h-4 w-4 sm:h-6 sm:w-6 text-rose-800"
                />
              </div>
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
