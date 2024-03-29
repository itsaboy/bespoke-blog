import HomePics from "../components/Home/HomePics";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pb-32 pt-10 sm:pt-60 lg:px-8 lg:pt-32">
        <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
          <div className="relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-l from-pink-300 to-pink-500 sm:text-5xl z-10 py-8">
              Captivating. Bold. Unapologetically Unique.
            </h2>
            <p className="text-sm sm:text-base leading-8 text-rose-300 sm:max-w-md lg:max-w-none">
              Beauty meets art, and stories unfold through the lens of fashion
              and lifestyle. Every snapshot tells a story, every look inspires a
              trend, and every moment is an invitation to dream bigger.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <button
                href="#"
                className="px-4 sm:px-10 py-2 bg-gradient-to-l from-pink-200 to-pink-400 border-2 border-pink-400 rounded-2xl shadow-neon shadow-pink-400/60 hover:bg-gradient-to-r hover:shadow-neon hover:shadow-pink-200/60 hover:border-pink-200"
              >
                Get started
              </button>
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-rose-300"
              >
                Log in <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <HomePics />
        </div>
      </div>
    </div>
  );
}
