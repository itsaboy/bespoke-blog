import React from "react";
import AboutImg7x5 from "./AboutImg7x5";
import AboutImg4x3 from "./AboutImg4x3";
import loadingIcon from "../../assets/icons/loading.svg";

export default function AboutPics({ images, loading }) {
  return (
    <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
      <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end hover:scale-105 ease-in-out duration-300 hover:skew-y-3 hover:-rotate-3 transform-gpu transition-transform">
        <div className="grid place-items-center">
          <AboutImg7x5 src={images[0]} alt="" />
          {loading && <img src={loadingIcon} className="absolute h-12 w-12" />}
        </div>
      </div>
      <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
        <div className="order-first flex w-64 flex-none justify-end self-end lg:w-auto hover:scale-105 ease-in-out duration-300 hover:-skew-y-3 hover:rotate-3 transform-gpu transition-transform">
          <div className="grid place-items-center">
            <AboutImg4x3 src={images[1]} />
            {loading && (
              <img src={loadingIcon} className="absolute h-12 w-12" />
            )}
          </div>
        </div>
        <div className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none hover:scale-105 ease-in-out duration-300 hover:skew-y-3 hover:-rotate-3 transform-gpu transition-transform">
          <div className="grid place-items-center">
            <AboutImg7x5 src={images[2]} alt="" />
            {loading && (
              <img src={loadingIcon} className="absolute h-12 w-12" />
            )}
          </div>
        </div>
        <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none hover:scale-105 ease-in-out duration-300 hover:-skew-y-3 hover:rotate-3 transform-gpu transition-transform">
          <div className="grid place-items-center">
            <img
              src={images[3]}
              alt=""
              className="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover shadow-neon shadow-pink-600/80 border-2 border-pink-400"
            />
            {loading && (
              <img src={loadingIcon} className="absolute h-12 w-12" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
