import { useAuthContext } from "../../hooks/useAuthContext";
import { action } from "../../data/dashboardPanel.js";
import dayjs from "dayjs";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DashboardActions({ newAction, setNewAction }) {
  const { user } = useAuthContext();
  return (
    <>
      <h2 className="text-base font-semibold leading-6 text-pink-300">
        Welcome back {user.username}!
      </h2>
      <p className="mt-1 text-sm text-rose-300">
        {dayjs().format("dddd, MMMM D, YYYY")}
      </p>
      <ul
        role="list"
        className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-t border-pink-200 py-6"
      >
        {action.map((item, itemIdx) => (
          <li
            key={itemIdx}
            className="flow-root"
            onClick={() => setNewAction(item.action)}
          >
            <div
              className={`relative -m-2 flex items-center space-x-4 rounded-xl p-2 hover:bg-rose-800/80 ${
                newAction === item.action &&
                "bg-rose-600 ring-2 ring-pink-500 animate-pulse"
              }`}
            >
              <div
                className={classNames(
                  item.background,
                  "flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg"
                )}
              >
                <item.icon
                  className="h-6 w-6 text-pink-50"
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
                <p className="mt-1 text-sm text-rose-200">{item.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
