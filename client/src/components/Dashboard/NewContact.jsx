import { useState } from "react";
import Feedback from "./Feedback";
import loadingIcon from "../../assets/icons/loading.svg";
import { refreshAccessToken } from "../../utils/refreshToken";

export default function NewContact() {
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [link, setLink] = useState("");
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [submissionMsg, setSubmissionMsg] = useState(null);

  const uploadContactInfoPostToServer = async () => {
    setSubmissionLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("info", info);
    formData.append("link", link);

    const attemptUpload = async () => {
      try {
        const response = await fetch("/api/contactPage/create", {
          method: "POST",
          body: formData,
          credentials: "include",
        });
        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            throw new Error("Authentication required");
          } else {
            throw new Error("Upload failed");
          }
        }
        const result = await response.json();
        setSubmissionMsg("Upload succeeded!");
        setName("");
        setInfo("");
        setLink("");
      } catch (error) {
        console.error("Error during upload:", error);
        if (error.message === "Authentication required") {
          try {
            const refreshSuccess = await refreshAccessToken();
            if (refreshSuccess) {
              const retryResponse = await fetch("/api/contactPage/create", {
                method: "POST",
                body: formData,
                credentials: "include",
              });
              if (!retryResponse.ok)
                throw new Error("Upload failed after retry");
              setSubmissionMsg("Upload succeeded after retry!");
              setName("");
              setInfo("");
              setLink("");
            } else {
              setSubmissionMsg("Session expired. Please log in again.");
            }
          } catch (retryError) {
            console.error("Error retrying upload:", retryError);
            setSubmissionMsg(retryError.message);
          }
        } else {
          setSubmissionMsg(error.message);
        }
      } finally {
        setSubmissionLoading(false);
      }
    };
    await attemptUpload();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadContactInfoPostToServer();
  };

  return (
    <form className="p-16 mx-auto max-w-2xl" onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <p className="mt-1 text-sm leading-6 text-pink-300">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-rose-200"
              >
                Service
              </label>
              <div className="mt-2">
                <textarea
                  id="name"
                  name="name"
                  rows={1}
                  className="block w-full rounded-md px-2 py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6 shadow-neon shadow-pink-600/80 border-2 border-pink-400"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required={true}
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="info"
                className="block text-sm font-medium leading-6 text-rose-200"
              >
                User
              </label>
              <div className="mt-2">
                <textarea
                  id="info"
                  name="info"
                  rows={1}
                  className="block w-full rounded-md px-2 py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6 shadow-neon shadow-pink-600/80 border-2 border-pink-400"
                  onChange={(e) => setInfo(e.target.value)}
                  value={info}
                  required={true}
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="link"
                className="block text-sm font-medium leading-6 text-rose-200"
              >
                Link
              </label>
              <div className="mt-2">
                <textarea
                  id="link"
                  name="link"
                  rows={1}
                  className="block w-full rounded-md px-2 py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6 shadow-neon shadow-pink-600/80 border-2 border-pink-400"
                  onChange={(e) => setLink(e.target.value)}
                  value={link}
                  required={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-x-6">
        {submissionLoading ? (
          <p className="px-4 sm:px-10 py-2 bg-gradient-to-l from-rose-200 to-rose-400 border-2 border-rose-400 rounded-2xl shadow-neon shadow-rose-400/60 text-pink-800 animate-pulse">
            <img className="h-6" src={loadingIcon} />
          </p>
        ) : (
          <button
            type="submit"
            className="px-4 sm:px-10 py-2 bg-gradient-to-l from-rose-200 to-rose-400 border-2 border-rose-400 rounded-2xl shadow-neon shadow-rose-400/60 hover:bg-gradient-to-r hover:shadow-neon hover:shadow-rose-200/60 hover:border-rose-200 text-pink-800"
          >
            Save
          </button>
        )}
        {submissionMsg && (
          <Feedback msg={submissionMsg} setMsg={setSubmissionMsg} />
        )}
      </div>
    </form>
  );
}
