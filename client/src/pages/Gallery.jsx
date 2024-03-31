import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { imageAnimationVariants } from "../data/animData.js";
import SelectedImg from "../components/Portfolio/SelectedImg.jsx";
import loadingIcon from "../assets/icons/loading.svg";

export default function Gallery() {
  const { postId } = useParams();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [imgPath, setImgPath] = useState(null);

  useEffect(() => {
    const fetchImagePost = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/imagePost/get/${postId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch image post");
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching image post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImagePost();
  }, [postId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post || loading) {
    return (
      <div className="bg-transparent py-64 mx-auto flex justify-center items-center">
        <img className="h-64 sm:h-96" src={loadingIcon} />
      </div>
    );
  }

  const handleClick = (path) => {
    setIsOpen(true);
    setImgPath(path);
  }

  return (
    <div className="bg-transparent py-20 mx-auto">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-6 lg:max-w-7xl lg:px-8">
        <div className="flex flex-col justify-center items-center mb-16">
          <h2 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-l from-pink-300 to-pink-500 sm:text-4xl z-10 py-8">
            {post.title}
          </h2>
          <p className="text-sm sm:text-base leading-8 text-rose-300 sm:max-w-md lg:max-w-none">
            {post.location}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-16">
          {post.imageUrls &&
            post.imageUrls.length > 0 &&
            post.imageUrls.map((url, index) => (
              <motion.button
                key={index}
                className="group"
                variants={imageAnimationVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                onClick={() => handleClick(url)}
              >
                <div className="aspect-h-16 aspect-w-9 w-full overflow-hidden rounded-2xl relative shadow-neon shadow-rose-400/60 border-2 border-rose-400 hover:scale-105 transition-all ease-in-out duration-500">
                  <img
                    src={url}
                    alt={`Image ${index + 1}`}
                    className="h-full w-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-600 opacity-20 rounded-2xl" />
                </div>
              </motion.button>
            ))}
        </div>
      </div>
      <SelectedImg isOpen={isOpen} setIsOpen={setIsOpen} imgPath={imgPath} />
    </div>
  );
}
