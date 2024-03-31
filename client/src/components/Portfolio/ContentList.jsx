import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import loadingIcon from "../../assets/icons/loading.svg";
import placeholder from "../../assets/images/9x16-placeholder.png";

export default function ContentList({ title, body }) {
  const [imagePosts, setImagePosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchImagePosts = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/imagePost/get");
        if (!response.ok) {
          throw new Error("Failed to fetch image posts");
        }
        const data = await response.json();
        setImagePosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching image posts:", error);
        setError(error.message);
      }
    };
    fetchImagePosts();
  }, []);

  return (
    <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-24 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="p-2 text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-l from-pink-300 to-pink-500 sm:text-4xl">
          {title}
        </h2>
        <p className="p-2 mt-6 text-lg leading-8 text-rose-300">{body}</p>
      </div>
      {loading ? (
        <div className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4">
          <div className="relative">
            <img
              className="aspect-[9/16] w-full rounded-2xl object-cover shadow-neon shadow-pink-600/80 border-2 border-pink-400 bg-gray-900/5"
              src={placeholder}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-600 opacity-40 rounded-xl" />
            <div className="absolute inset-0 flex justify-center items-center">
              <img className="h-24 sm:h-48 w-auto" src={loadingIcon} />
            </div>
          </div>
        </div>
      ) : (
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4"
        >
          {imagePosts.map((post) => (
            <article
              key={post.createdAt}
              className="flex flex-col items-start justify-between"
            >
              <Link to={`/gallery/${post._id}`}>
                <div className="relative w-full hover:animate-shake">
                  <img
                    src={post.imageUrls[0]}
                    alt=""
                    className="aspect-[9/16] w-full rounded-2xl bg-rose-800 object-cover shadow-neon shadow-pink-600/80 border-2 border-pink-400"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400 to-pink-600 opacity-40" />
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-rose-600 rounded-xl transition-opacity duration-500 opacity-0 hover:opacity-20" />
                </div>
              </Link>
              <div className="max-w-xl mt-5">
                <div className="group relative">
                  <h3 className="mt-1 text-lg font-semibold leading-6 text-red-400 hover:text-pink-400">
                    <Link to={`/gallery/${post._id}`}>{post.title}</Link>
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-pink-300">
                    {dayjs(post.createdAt).format("MMMM D, YYYY")}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </ul>
      )}
    </div>
  );
}
