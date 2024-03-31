import React from "react";

export default function AboutImg4x3({src, alt}) {
  return (
    <>
      <img
        src={src}
        alt=""
        className="aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover shadow-neon shadow-pink-600/80 border-2 border-pink-400"
      />
    </>
  );
}
