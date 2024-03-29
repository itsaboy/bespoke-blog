import {
  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";

export default function Feedback({ msg, setMsg }) {
  return (
    <div className="rounded-md bg-pink-200/80 p-2.5">
      <div className="flex">
        <div className="flex-shrink-0">
          {msg === "Upload succeeded!" ||
          msg === "Fetch succeeded!" ||
          mgs === "Delete succeeded!" ? (
            <CheckCircleIcon
              className="h-5 w-5 text-rose-600"
              aria-hidden="true"
            />
          ) : msg === "Upload failed!" || msg === "Fetch failed!" || mgs === "Delete Failed!" ? (
            <XCircleIcon className="h-5 w-5 text-rose-600" aria-hidden="true" />
          ) : null}
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-rose-800">{msg}</p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              className="inline-flex rounded-md bg-rose-100 p-1.5 text-rose-500 hover:bg-rose-200"
              onClick={() => setMsg(null)}
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
