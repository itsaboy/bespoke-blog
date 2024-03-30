import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import Feedback from "./Feedback";
import loadingIcon from "../../assets/icons/loading.svg";
import { refreshAccessToken } from "../../utils/refreshToken";

export default function ChangeHome() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [submissionMsg, setSubmissionMsg] = useState(null);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files).slice(0, 5);
    setImages(files);

    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previewUrls);
  };

  const uploadHomePagePostToServer = async () => {
    setSubmissionLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    for (let file of images) {
      formData.append("image", file);
    }
    
    const attemptUpload = async () => {
      try {
        const response = await fetch("/api/homePagePost/create", {
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
        setTitle("");
        setBody("");
        setImages([]);
        setImagePreviews([]);
      } catch (error) {
        console.error("Error during upload:", error);
        if (error.message === "Authentication required") {
          try {
            const refreshSuccess = await refreshAccessToken();
            if (refreshSuccess) {
              const retryResponse = await fetch("/api/homePagePost/create", {
                method: "POST",
                body: formData,
                credentials: "include",
              });
              if (!retryResponse.ok)
                throw new Error("Upload failed after retry");
              setSubmissionMsg("Upload succeeded after retry!");
              setTitle("");
              setBody("");
              setImages([]);
              setImagePreviews([]);
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
    uploadHomePagePostToServer();
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
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-rose-200"
              >
                Title
              </label>
              <div className="mt-2">
                <textarea
                  id="title"
                  name="title"
                  rows={1}
                  className="block w-full rounded-md px-2 py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6 shadow-neon shadow-pink-600/80 border-2 border-pink-400"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="body"
                className="block text-sm font-medium leading-6 text-rose-200"
              >
                Body
              </label>
              <div className="mt-2">
                <textarea
                  id="body"
                  name="body"
                  rows={12}
                  className="block w-full rounded-md px-2 py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6 shadow-neon shadow-pink-600/80 border-2 border-pink-400"
                  onChange={(e) => setBody(e.target.value)}
                  value={body}
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="image-input"
                className="mb-3 block opacity-0 text-sm font-medium leading-6 text-rose-200"
              >
                Image
              </label>
              {imagePreviews.length > 0 ? (
                <div className="grid grid-cols-4 gap-2">
                  {imagePreviews.map((previewUrl, index) => (
                    <img
                      key={index}
                      src={previewUrl}
                      alt={`Preview ${index}`}
                      className="max-h-64"
                    />
                  ))}
                </div>
              ) : (
                <div className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <input
                    id="image-input"
                    type="file"
                    accept="image/*"
                    multiple={true}
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <span className="mt-2 block text-sm font-semibold text-pink-200">
                    Upload Images (max 5)
                  </span>
                </div>
              )}
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
