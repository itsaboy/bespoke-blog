export default function HomeText({ title, body }) {
  return (
    <>
      <h2 className="p-2 text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-l from-pink-300 to-pink-500 sm:text-5xl z-10">
        {title}
      </h2>
      <div className="p-2 mt-4 text-sm sm:text-base leading-8 text-rose-300 sm:max-w-md lg:max-w-none">
        {body}
      </div>
    </>
  );
}
