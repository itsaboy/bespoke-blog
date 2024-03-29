import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { imageAnimationVariants } from "../data/animData.js";
import loadingIcon from "../assets/icons/loading.svg";

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
    return (
      <div className="bg-transparent py-64 mx-auto flex justify-center items-center">
        <img className="h-64 sm:h-96" src={loadingIcon} />
      </div>
    );
  }

  return (
    <div className="bg-transparent py-20 mx-auto">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-16">
          {post.imageUrls &&
            post.imageUrls.length > 0 &&
            post.imageUrls.map((url, index) => (
              <motion.a
                key={index}
                href={url}
                className="group"
                target="_blank"
                rel="noopener noreferrer"
                variants={imageAnimationVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <div className="aspect-h-16 aspect-w-9 w-full overflow-hidden rounded-2xl relative shadow-neon shadow-rose-400/60 border-2 border-rose-400 hover:scale-105 transition-all ease-in-out duration-500">
                  <img
                    src={url}
                    alt={`Image ${index + 1}`}
                    className="h-full w-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-600 opacity-20 rounded-2xl" />
                </div>
              </motion.a>
            ))}
        </div>
      </div>
    </div>
  );
}
