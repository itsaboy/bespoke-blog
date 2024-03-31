import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import Feedback from "./Feedback";
import TitleInput from "./TitleInput";
import BodyInput from "./BodyInput";
import SubbodyInput from "./SubbodyInput";
import loadingIcon from "../../assets/icons/loading.svg";
import { refreshAccessToken } from "../../utils/refreshToken";

export default function ChangeAbout() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [subBody, setSubBody] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [submissionMsg, setSubmissionMsg] = useState(null);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files).slice(0, 4);
    setImages(files);

    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previewUrls);
  };

  const uploadAboutPagePostToServer = async () => {
    setSubmissionLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("subBody", subBody);
    for (let file of images) {
      formData.append("image", file);
    }

    const attemptUpload = async () => {
      try {
        const checkResponse = await fetch("/api/aboutPagePost/check", {
          method: "GET",
          credentials: "include",
        });
        if (checkResponse.ok) {
          const { exists, id } = await checkResponse.json();
          if (exists && id) {
            await fetch(`/api/aboutPagePost/delete/${id}`, {
              method: "DELETE",
              credentials: "include",
            });
          }
        }

        const response = await fetch("/api/aboutPagePost/create", {
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
        setSubBody("");
        setImages([]);
        setImagePreviews([]);
      } catch (error) {
        console.error("Error during upload:", error);
        if (error.message === "Authentication required") {
          try {
            const refreshSuccess = await refreshAccessToken();
            if (refreshSuccess) {
              const retryResponse = await fetch("/api/aboutPagePost/create", {
                method: "POST",
                body: formData,
                credentials: "include",
              });
              if (!retryResponse.ok)
                throw new Error("Upload failed after retry");
              setSubmissionMsg("Upload succeeded after retry!");
              setTitle("");
              setBody("");
              setSubBody("");
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
    uploadAboutPagePostToServer();
  };

  return (
    <form className="p-4 sm:p-16 mx-auto max-w-2xl" onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <p className="mt-1 text-lg leading-6 text-pink-300">
            Edit about page content
          </p>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <TitleInput title={title} setTitle={setTitle} />
            <BodyInput
              body={body}
              setBody={setBody}
              toolTip={"Keep this to one paragraph"}
            />
            <SubbodyInput subBody={subBody} setSubBody={setSubBody} />
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
                    Upload Images (max 4)
                  </span>
                </div>
              )}
              <p
                className="mt-2 text-sm text-pink-200"
                id="image-input-description"
              >
                Recommended aspect ratio is 4:3
              </p>
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
