import home1 from "../../assets/images/home1.webp";
import home2 from "../../assets/images/home2.webp";
import home3 from "../../assets/images/home3.webp";
import home4 from "../../assets/images/home4.webp";
import home5 from "../../assets/images/home5.webp";

export default function HomePics() {
  return (
    <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
      <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
        <div className="relative">
          <img
            src={home1}
            alt=""
            className="aspect-[9/16] w-full rounded-xl bg-gray-900/5 object-cover shadow-neon shadow-pink-600/80 border-2 border-pink-400"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-600 opacity-40 rounded-xl"/>
          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
        </div>
      </div>
      <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
        <div className="relative">
          <img
            src={home2}
            alt=""
            className="aspect-[9/16] w-full rounded-xl bg-gray-900/5 object-cover shadow-neon shadow-pink-600/80 border-2 border-pink-400"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-600 opacity-40 rounded-xl"/>
          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
        </div>
        <div className="relative">
          <img
            src={home3}
            alt=""
            className="aspect-[9/16] w-full rounded-xl bg-gray-900/5 object-cover shadow-neon shadow-pink-600/80 border-2 border-pink-400"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-600 opacity-40 rounded-xl"/>
          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
        </div>
      </div>
      <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
        <div className="relative">
          <img
            src={home4}
            alt=""
            className="aspect-[9/16] w-full rounded-xl bg-gray-900/5 object-cover shadow-neon shadow-pink-600/80 border-2 border-pink-400"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-600 opacity-40 rounded-xl"/>
          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
        </div>
        <div className="relative">
          <img
            src={home5}
            alt=""
            className="aspect-[9/16] w-full rounded-xl bg-gray-900/5 object-cover shadow-neon shadow-pink-600/80 border-2 border-pink-400"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-600 opacity-40 rounded-xl"/>
          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
        </div>
      </div>
    </div>
  );
}
