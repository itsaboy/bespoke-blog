import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BlogPost() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await fetch(`/api/blogPost/get/${postId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blog post");
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setError("Failed to load image post.");
      }
    };

    fetchBlogPost();
  }, [postId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  const renderPostBody = (body) => {
    return body.split("\n\n").map((paragraph, index) => (
      <p key={index} className="mb-4 text-pink-200">
        {paragraph.split("\n").map((line, lineIndex) => (
          <Fragment key={lineIndex}>
            {line}
            {lineIndex < paragraph.split("\n").length - 1 && <br />}
          </Fragment>
        ))}
      </p>
    ));
  };

  return (
    <div className="bg-transparent py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-4">
            <div className="relative w-3/4 rounded-xl mx-auto">
              <img
                src={post.imageUrls[0]}
                alt=""
                className="aspect-[9/16] rounded-xl bg-gray-900/5 object-cover shadow-neon shadow-rose-600/80 border-2 border-rose-400"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-rose-600 opacity-40 rounded-xl" />
              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
            </div>
          </div>
          <div>
            <div className="text-base leading-7 text-gray-700 lg:max-w-lg">
              <p className="p-2 text-base font-semibold leading-7 text-rose-400">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <h1 className="p-2 text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-l from-pink-300 to-pink-500 sm:text-4xl">
                {post.title}
              </h1>
              <div className="p-2 max-w-xl">{renderPostBody(post.body)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
