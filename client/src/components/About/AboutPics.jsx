import React from "react";
import AboutImg7x5 from "./AboutImg7x5";
import AboutImg4x3 from "./AboutImg4x3";

export default function AboutPics({ images }) {
  return (
    <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
      <div className="relative w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end hover:scale-105 ease-in-out duration-300 hover:skew-y-3 hover:-rotate-3 transform-gpu transition-transform">
        <AboutImg7x5 src={images[0]} alt="" />
      </div>
      <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
        <div className="relative order-first flex w-64 flex-none justify-end self-end lg:w-auto hover:scale-105 ease-in-out duration-300 hover:-skew-y-3 hover:rotate-3 transform-gpu transition-transform">
          <AboutImg4x3 src={images[1]} />
        </div>
        <div className="relative flex w-96 flex-auto justify-end lg:w-auto lg:flex-none hover:scale-105 ease-in-out duration-300 hover:skew-y-3 hover:-rotate-3 transform-gpu transition-transform">
          <AboutImg7x5 src={images[2]} alt="" />
        </div>
        <div className="relative hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none hover:scale-105 ease-in-out duration-300 hover:-skew-y-3 hover:rotate-3 transform-gpu transition-transform">
          <img
            src={images[3]}
            alt=""
            className="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover shadow-neon shadow-pink-600/80 border-2 border-pink-400"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-600 opacity-40 aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-rose-600 aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl object-cover transition-opacity duration-500 opacity-0 hover:opacity-20" />
        </div>
      </div>
    </div>
  );
}
