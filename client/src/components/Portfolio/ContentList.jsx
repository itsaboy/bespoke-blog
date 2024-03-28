import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

export default function ContentList() {
  const {
    loadedLocations,
    setLoadedLocations,
    setCurrentLocation,
  } = useContext(AppContext);

  const getLocations = async () => {
    const req = `/api/location`;
    const res = await fetch(req);
    const data = await res.json();
    setLoadedLocations(data);
  };

  useEffect(() => {
    getLocations();
  }, []);

  const handleClick = (location) => {
    setCurrentLocation(location);
    console.log(location);
  };

  return (
    <div className="mx-auto mt-24 max-w-7xl px-6 sm:mt-32 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-l from-pink-300 to-pink-500 sm:text-4xl">
          Beauty & Grace
        </h2>
        <p className="mt-6 text-lg leading-8 text-rose-400">
          Dive into the visual journey of [Model's Name] — where each frame is a
          story, each look a chapter in a vast, unfolding narrative. Welcome to
          a place where beauty and storytelling intersect to create something
          truly unforgettable.
        </p>
      </div>
      <ul
        role="list"
        className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4"
      >
        {loadedLocations && (
          <>
            {loadedLocations.map((post) => (
              <Link
                key={post.folderName}
                className="hover:cursor-pointer"
                to="/gallery"
                onClick={() => handleClick(post.folderName)}
              >
                <li>
                  <div className="relative">
                    <img
                      className="aspect-[9/16] w-full rounded-3xl object-cover shadow-neon shadow-rose-600/80 border-2 border-pink-400"
                      src={post.imageUrl}
                      alt=""
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-600 opacity-40 rounded-3xl" />
                  </div>

                  <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-pink-300">
                    {post.folderName}
                  </h3>
                  <p className="text-sm leading-6 text-rose-400">
                    {post.uploadDate}
                  </p>
                </li>
              </Link>
            ))}
          </>
        )}
        {/* {currentlocations.map((post) => (
          <Link className="hover:cursor-pointer" to="/gallery">
            <li key={post.index}>
              <div className="relative">
                <img
                  className="aspect-[9/16] w-full rounded-3xl object-cover shadow-neon shadow-rose-600/80 border-2 border-pink-400"
                  src={post.imageUrl}
                  alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-600 opacity-40 rounded-3xl" />
              </div>

              <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-pink-300">
                {post.location}
              </h3>
              <p className="text-base leading-7 text-gray-200">
                {post.geoLocation}
              </p>
              <p className="text-sm leading-6 text-rose-400">{post.date}</p>
            </li>
          </Link>
        ))} */}
      </ul>
    </div>
  );
}
