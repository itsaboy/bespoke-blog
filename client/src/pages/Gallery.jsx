import { useEffect, useContext, useState } from "react";
import { motion } from "framer-motion";
import { imageAnimationVariants } from "../data/animData.js";
import { AppContext } from "../context/AppContext";

export default function Gallery() {
  const [currentImages, setCurrentImages] = useState([]);
  const { currentLocation } = useContext(AppContext);

  const getImages = async () => {
    const req = `/api/images?location=${currentLocation}`;
    const res = await fetch(req);
    const data = await res.json();
    setCurrentImages(data);
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <div className="bg-transparent py-20 mx-auto">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-6 lg:max-w-7xl lg:px-8">
        {/* {isLoading ? (
          <p>test</p>
        ) : ( */}
        <div className="grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-16">
          {currentImages.length > 0 && (
            <>
              {currentImages.map((image) => (
                <a key={image} className="group">
                  <div className="aspect-h-16 aspect-w-9 w-full overflow-hidden rounded-2xl relative shadow-neon shadow-rose-400/60 border-2 border-rose-400">
                    <motion.img
                      src={image}
                      variants={imageAnimationVariants}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true }}
                      className="h-full w-full object-cover object-center group-hover:opacity-75 hover:cursor-zoom-in"
                      // onClick={() => handleImageClick(location)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-600 opacity-20 rounded-2xl" />
                  </div>
                </a>
              ))}
            </>
          )}
        </div>
      </div>
      {/* {isOpen ? (
        <Clicked isOpen={isOpen} setIsOpen={setIsOpen} imgPath={imgPath} />
      ) : null} */}
    </div>
  );
}
