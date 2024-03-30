import { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { refreshAccessToken } from "../../utils/refreshToken";
import placeholder from "../../assets/images/9x16-placeholder.png";
import dayjs from "dayjs";

export default function DeleteContact() {
  const [contactInfo, setContactInfo] = useState([]);
  const [error, setError] = useState("");

  const fetchContact = async () => {
    try {
      const response = await fetch("/api/contactPage/get");
      if (!response.ok) {
        throw new Error("Failed to fetch contact info");
      }
      const data = await response.json();
      setContactInfo(data);
    } catch (error) {
      console.error("Error fetching contact info:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

  const deletePost = async (postId) => {
    const attemptDelete = async () => {
      try {
        const response = await fetch(`/api/contactPage/delete/${postId}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            throw new Error("Authentication required");
          } else {
            throw new Error("Failed to delete the post.");
          }
        }
        fetchContact();
      } catch (error) {
        console.error("Error during delete operation:", error);
        if (error.message === "Authentication required") {
          try {
            const refreshSuccess = await refreshAccessToken();
            if (refreshSuccess) {
              const retryResponse = await fetch(
                `/api/contactPage/delete/${postId}`,
                {
                  method: "DELETE",
                  credentials: "include",
                }
              );
              if (!retryResponse.ok)
                throw new Error("Failed to delete the post after retry");
              fetchContact();
            } else {
              console.log("Session expired. Please log in again.");
            }
          } catch (retryError) {
            console.error("Error retrying delete:", retryError);
          }
        } else {
          console.log(error.message);
        }
      }
    };

    await attemptDelete();
  };

  return (
    <>
      {contactInfo.length > 0 && (
        <>
          <ul
            role="list"
            className="p-4 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
          >
            {contactInfo.map((post) => (
              <li key={post._id} className="relative">
                <div className="group relative aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg border-rose-950 border-2 hover:border-pink-200 hover:cursor-pointer">
                  <img
                    src={placeholder}
                    alt=""
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-rose-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-rose-400 opacity-100 group-hover:opacity-0 transition-opacity" />
                  <button
                    className="absolute inset-10 z-20"
                    onClick={() => deletePost(post._id)}
                  >
                    <TrashIcon
                      className="h-16 w-16 text-rose-300"
                      aria-hidden="true"
                    />
                  </button>
                  <div className="absolute inset-0 flex flex-col items-center justify-between p-4 group-hover:justify-around transition-all duration-300">
                    <p className="truncate text-sm font-medium text-pink-200 self-start mt-2 group-hover:mt-0">
                      {post.name}
                    </p>
                    <p className="truncate text-sm font-medium text-pink-200 self-end mb-2 group-hover:mb-0">
                      {post.info}
                    </p>
                  </div>
                </div>

                <p className="pointer-events-none mt-2 block text-sm font-medium text-center text-pink-300">
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
      {contactInfo.length < 1 && (
        <h3 className="p-6 text-center text-2xl text-pink-200">
          There is no saved contact info!
        </h3>
      )}
    </>
  );
}
