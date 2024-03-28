import React from "react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { BENEFITS } from "../../data/portfolioData";
import CTA1 from "../../assets/images/CTA1.webp";

export default function CallToAction() {
  return (
    <div className="relative isolate -z-10 mt-32 sm:mt-40">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col gap-16 bg-gradient-to-r from-pink-400/40 to-pink-600/40 px-6 py-16 ring-1 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20 shadow-neon shadow-pink-600/80 border-2 border-pink-600">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-rose-600 opacity-50 rounded-2xl" />
            <img
              className="w-full flex-none rounded-2xl object-cover lg:aspect-square lg:h-auto lg:max-w-sm shadow-neon shadow-rose-600/80 border-2 border-rose-400"
              src={CTA1}
              alt=""
            />
          </div>

          <div className="w-full flex-auto">
            <h2 className="p-4 text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-l from-pink-300 to-pink-500 sm:text-4xl">
              Sign up for exclusive content
            </h2>
            <p className="p-4 text-lg leading-8 text-rose-300">
              {/* Discover what lies beyond the lens and become a part of [Model's
              Name]'s inner circle. */}
              Placeholder p
            </p>
            <ul
              role="list"
              className="p-4 grid grid-cols-1 gap-x-8 gap-y-3 text-base leading-7 text-pink-200 sm:grid-cols-2"
            >
              {/* {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex gap-x-3">
                  <CheckCircleIcon
                    className="h-7 w-5 flex-none"
                    aria-hidden="true"
                  />
                  {benefit}
                </li>
              ))} */}
            </ul>
            <div className="p-4 flex">
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-pink-300"
              >
                Sign up <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[1318/752] w-[82.375rem] flex-none bg-gradient-to-r from-pink-800 to-pink-400 opacity-25"
          style={{
            clipPath:
              "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
          }}
        />
      </div>
    </div>
  );
}
