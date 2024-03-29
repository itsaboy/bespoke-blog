import React from "react";

export default function AboutImg4x3({src, alt}) {
  return (
    <>
      <img
        src={src}
        alt=""
        className="aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover shadow-neon shadow-pink-600/80 border-2 border-pink-400"
      />
      <div className="absolute bg-gradient-to-r from-pink-400 to-pink-600 opacity-40 aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl object-cover" />
      <div className="absolute bg-gradient-to-r from-rose-400 to-rose-600 aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl object-cover transition-opacity duration-500 opacity-0 hover:opacity-20" />
    </>
  );
}
