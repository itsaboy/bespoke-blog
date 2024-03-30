export default function AboutText({ title, body, subBody }) {
  return (
    <>
      <h2 className="p-2 text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-l from-pink-300 to-pink-500 sm:text-4xl">
        {title}
      </h2>
      <p className="p-2 mt-4 text-xl leading-8 text-rose-300">{body}</p>
      <p className="p-2 mt-4 text-lg leading-7 text-pink-300">{subBody}</p>
    </>
  );
}
