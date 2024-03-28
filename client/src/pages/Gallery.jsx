import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { imageAnimationVariants } from "../data/animData.js";

export default function Gallery() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchImagePost = async () => {
      try {
        const response = await fetch(`/api/imagePost/get/${postId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch image post");
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching image post:", error);
      }
    };

    fetchImagePost();
  }, [postId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-transparent py-20 mx-auto">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-16">
          {post.imageUrls &&
            post.imageUrls.length > 0 &&
            post.imageUrls.map((url, index) => (
              <a
                key={index}
                href={url}
                className="group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="aspect-h-16 aspect-w-9 w-full overflow-hidden rounded-2xl relative shadow-neon shadow-rose-400/60 border-2 border-rose-400">
                  <motion.img
                    src={url}
                    alt={`Image ${index + 1}`}
                    variants={imageAnimationVariants}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-600 opacity-20 rounded-2xl" />
                </div>
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}
