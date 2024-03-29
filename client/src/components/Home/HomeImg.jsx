export default function HomeImg({ src, alt }) {
  return (
    <div className="relative hover:scale-105 ease-in-out duration-300 hover:skew-y-3 hover:-rotate-3 transform-gpu transition-transform">
      <img
        src={src}
        alt={alt}
        className="aspect-[9/16] w-full rounded-xl bg-gray-900/5 object-cover shadow-neon shadow-pink-600/80 border-2 border-pink-400"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-600 opacity-40 rounded-xl" />
      <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-rose-600 rounded-xl transition-opacity duration-500 opacity-0 hover:opacity-20" />
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
    </div>
  );
}
