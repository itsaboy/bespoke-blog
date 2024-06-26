import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import loadingIcon from "../../assets/icons/loading.svg";

export default function Blog({ title, body }) {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/blogPost/get");
        if (!response.ok) {
          throw new Error("Failed to fetch blog posts");
        }
        const data = await response.json();
        setBlogPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setError(error.message);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-24 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="p-2 text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-l from-pink-300 to-pink-500 sm:text-4xl">
          {title}
        </h2>
        <p className="p-2 mt-6 text-lg leading-8 text-rose-300">
          {body}
        </p>
      </div>
      {loading ? (
        <div className="mx-auto my-16 flex justify-center">
          <img className="h-64 sm:h-96" src={loadingIcon} />
        </div>
      ) : (
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4"
        >
          {blogPosts.map((post) => (
            <article
              key={post.createdAt}
              className="flex flex-col items-start justify-between"
            >
              <Link to={`/blog/${post._id}`}>
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
                    <Link to={`/blog/${post._id}`}>{post.title}</Link>
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
