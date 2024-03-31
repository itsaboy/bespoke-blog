import React from "react";

export default function AboutImg7x5({ src, alt }) {
  return (
    <>
      <img
        src={src}
        alt=""
        className="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover shadow-neon shadow-pink-600/80 border-2 border-pink-400"
      />
    </>
  );
}
