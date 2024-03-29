import { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import Feedback from "./Feedback";
import dayjs from "dayjs";
import { refreshAccessToken } from "../../utils/refreshToken";

export default function DeleteBlog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [error, setError] = useState("");
  const [submissionMsg, setSubmissionMsg] = useState(null);

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch("/api/blogPost/get");
      if (!response.ok) {
        setSubmissionMsg("Failed to fetch!");
      }
      const data = await response.json();
      setBlogPosts(data);
      setSubmissionMsg("Fetch succeeded!");
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const deletePost = async (postId) => {
    const attemptDelete = async () => {
      try {
        const response = await fetch(`/api/blogPost/delete/${postId}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            throw new Error("Authentication required");
          } else {
            throw new Error("Delete failed");
          }
        }
        fetchBlogPosts();
        setSubmissionMsg("Delete succeeded!");
      } catch (error) {
        console.error("Error during delete operation:", error);
        if (error.message === "Authentication required") {
          try {
            const refreshSuccess = await refreshAccessToken();
            if (refreshSuccess) {
              const retryResponse = await fetch(
                `/api/blogPost/delete/${postId}`,
                {
                  method: "DELETE",
                  credentials: "include",
                }
              );
              if (!retryResponse.ok)
                throw new Error("Delete failed after retry");
              fetchBlogPosts();
              setSubmissionMsg("Delete succeeded after retry!");
            } else {
              setSubmissionMsg("Session expired. Please log in again.");
            }
          } catch (retryError) {
            console.error("Error retrying delete:", retryError);
            setSubmissionMsg(retryError.message);
          }
        } else {
          setSubmissionMsg(error.message);
        }
      }
    };

    await attemptDelete();
  };

  return (
    <>
      {blogPosts.length > 0 && (
        <>
          <ul
            role="list"
            className="p-4 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
          >
            {blogPosts.map((post) => (
              <li key={post._id} className="relative">
                <div className="group relative aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg border-gray-950 border-2 hover:border-pink-200">
                  <img
                    src={post.imageUrls[0]}
                    alt=""
                    className="object-cover group-hover:opacity-75"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="hover:cursor-pointer"
                      onClick={() => deletePost(post._id)}
                    >
                      <TrashIcon
                        className="h-16 w-16 text-rose-300"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
                <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-pink-200">
                  {post.title}
                </p>
                <p className="pointer-events-none block text-sm font-medium text-pink-300">
                  {dayjs(post.createdAt).format("MMMM D, YYYY")}
                </p>
              </li>
            ))}
          </ul>
          <div className="rounded-b-2xl border-t-2 border-t-rose-400 text-center bg-pink-200/80 p-2.5">
            <h4>Click a post to delete it</h4>
          </div>
        </>
      )}
      {blogPosts.length < 1 && (
        <h3 className="p-6 text-center text-2xl text-pink-200">
          There are no saved blog posts!
        </h3>
      )}
    </>
  );
}
