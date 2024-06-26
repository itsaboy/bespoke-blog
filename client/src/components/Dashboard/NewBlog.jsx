import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import Feedback from "./Feedback";
import TitleInput from "./TitleInput";
import BodyInput from "./BodyInput";
import loadingIcon from "../../assets/icons/loading.svg";
import { refreshAccessToken } from "../../utils/refreshToken";

export default function NewBlog() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [submissionMsg, setSubmissionMsg] = useState(null);

  const handleFileChange = (event) => {
    const files = event.target.files;
    setImage(files);

    const previewUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setImagePreview(previewUrls);
  };

  const uploadBlogPostToServer = async () => {
    setSubmissionLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    for (let file of image) {
      formData.append("image", file);
    }

    const attemptUpload = async () => {
      try {
        const response = await fetch("/api/blogPost/create", {
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
        setImage([]);
        setImagePreview("");
      } catch (error) {
        console.error("Error during upload:", error);
        if (error.message === "Authentication required") {
          try {
            const refreshSuccess = await refreshAccessToken();
            if (refreshSuccess) {
              const retryResponse = await fetch("/api/blogPost/create", {
                method: "POST",
                body: formData,
                credentials: "include",
              });
              if (!retryResponse.ok)
                throw new Error("Upload failed after retry");
              setSubmissionMsg("Upload succeeded after retry!");
              setTitle("");
              setBody("");
              setImage([]);
              setImagePreview("");
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
    uploadBlogPostToServer();
  };

  return (
    <form className="p-4 sm:p-16 mx-auto max-w-2xl" onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-pink-200/60 pb-12">
          <h3 className="mt-1 text-lg leading-6 text-pink-300">
            Create a new blog post
          </h3>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <TitleInput title={title} setTitle={setTitle} />
            <BodyInput body={body} setBody={setBody} />
            <div className="col-span-full">
              <label
                htmlFor="image-input"
                className="mb-3 block opacity-0 text-sm font-medium leading-6 text-rose-200"
              >
                Image
              </label>
              {imagePreview.length > 0 ? (
                <div className="flex justify-start">
                  {imagePreview.map((previewUrl, index) => (
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
                    multiple={false}
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <span className="mt-2 block text-sm font-semibold text-pink-200">
                    Upload Image
                  </span>
                </div>
              )}
              <p
                className="mt-2 text-sm text-pink-200"
                id="image-input-description"
              >
                Recommended aspect ratio is 9:16
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-x-6">
        {submissionLoading ? (
          <p className="px-4 sm:px-10 py-2 bg-gradient-to-l from-rose-200 to-rose-400 border-2 border-rose-400 rounded-2xl shadow-neon shadow-rose-400/60 text-pink-800 animate-pulse">
            <img className="h-6" src={loadingIcon} />
          </p>
        ) : (
          <button
            type="submit"
            className="px-4 sm:px-10 py-2 bg-gradient-to-l from-rose-200 to-rose-400 border-2 border-rose-400 rounded-2xl shadow-neon shadow-rose-400/60 hover:bg-gradient-to-r hover:shadow-neon hover:shadow-rose-200/60 hover:border-rose-200 text-pink-800 mb-4 sm:mb-0"
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
