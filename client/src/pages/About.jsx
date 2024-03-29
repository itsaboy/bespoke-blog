import AboutImg7x5 from "../components/About/AboutImg7x5";
import AboutImg4x3 from "../components/About/AboutImg4x3";
import about1 from "../assets/images/about1.webp";
import about2 from "../assets/images/about2.webp";
import about3 from "../assets/images/about3.webp";
import about4 from "../assets/images/about4.webp";

export default function About() {
  return (
    <div className="pt-32 overflow-hidden sm:pt-40 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
          <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
            <h2 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-l from-pink-300 to-pink-500 sm:text-4xl">
              Not just a model...
            </h2>
            <p className="mt-6 text-xl leading-8 text-rose-300">
              ...but a beacon of self-expression. With roots in Thailand, she
              has captivated audiences worldwide with her unique blend of
              elegance, strength, and creativity.
            </p>
            <p className="mt-6 text-lg leading-7 text-pink-300">
              Her journey is one of passion, dedication, and a relentless
              pursuit of artistry that resonates with a diverse and growing
              audience.
            </p>
          </div>
          <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
            <div className="relative w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end hover:scale-105 ease-in-out duration-300 hover:skew-y-3 hover:-rotate-3 transform-gpu transition-transform">
              <AboutImg7x5 src={about2} alt="" />
            </div>
            <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
              <div className="relative order-first flex w-64 flex-none justify-end self-end lg:w-auto hover:scale-105 ease-in-out duration-300 hover:skew-y-3 hover:-rotate-3 transform-gpu transition-transform">
                <AboutImg4x3 src={about1} />
              </div>
              <div className="relative flex w-96 flex-auto justify-end lg:w-auto lg:flex-none hover:scale-105 ease-in-out duration-300 hover:skew-y-3 hover:-rotate-3 transform-gpu transition-transform">
                <AboutImg7x5 src={about3} alt="" />
              </div>
              <div className="relative hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none hover:scale-105 ease-in-out duration-300 hover:skew-y-3 hover:-rotate-3 transform-gpu transition-transform">
                <img
                  src={about4}
                  alt=""
                  className="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover shadow-neon shadow-pink-600/80 border-2 border-pink-400"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-600 opacity-40 aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-rose-600 aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl object-cover transition-opacity duration-500 opacity-0 hover:opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
