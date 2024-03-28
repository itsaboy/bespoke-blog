import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";

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
    try {
      const response = await fetch("/api/blogPost/create", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
      });
      const result = await response.json();
      setSubmissionMsg(result.message || "Blog post uploaded successfully!");
      setTitle("");
      setBody("");
      setImage("");
      setImagePreview("");
    } catch (error) {
      console.error("Error creating post:", error);
      setSubmissionMsg("Failed to upload blog post.");
    } finally {
      setSubmissionLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadBlogPostToServer();
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
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-rose-200"
              >
                Title
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={1}
                  className="block w-full rounded-md px-2 py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6 shadow-neon shadow-pink-600/80 border-2 border-pink-400"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-rose-200"
              >
                Body
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
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
              {imagePreview.length > 0 ? (
                <div className="grid grid-cols-4 gap-2">
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
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        {submissionLoading ? (
          <p className="px-4 sm:px-10 py-2 bg-gradient-to-l from-rose-200 to-rose-400 border-2 border-rose-400 rounded-2xl shadow-neon shadow-rose-400/60 hover:bg-gradient-to-r hover:shadow-neon hover:shadow-rose-200/60 hover:border-rose-200 text-pink-800 animate-pulse">
            Loading...
          </p>
        ) : submissionMsg ? (
          <p className="px-4 sm:px-10 py-2 bg-gradient-to-l from-rose-200 to-rose-400 border-2 border-rose-400 rounded-2xl shadow-neon shadow-rose-400/60 hover:bg-gradient-to-r hover:shadow-neon hover:shadow-rose-200/60 hover:border-rose-200 text-pink-800 animate-pulse">
            {submissionMsg}
          </p>
        ) : (
          <button
            type="submit"
            className="px-4 sm:px-10 py-2 bg-gradient-to-l from-rose-200 to-rose-400 border-2 border-rose-400 rounded-2xl shadow-neon shadow-rose-400/60 hover:bg-gradient-to-r hover:shadow-neon hover:shadow-rose-200/60 hover:border-rose-200 text-pink-800"
          >
            Save
          </button>
        )}
      </div>
    </form>
  );
}
