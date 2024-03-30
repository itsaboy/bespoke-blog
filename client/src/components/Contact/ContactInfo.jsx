export default function ContactInfo({ content }) {
  const columns = Math.ceil(content.length / 4);
  const gridTemplateColumns = `grid-cols-${columns}`;

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10">
      <div>
        <h2 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-l from-pink-300 to-pink-500">
          Get in touch
        </h2>
        <p className="mt-4 leading-7 text-rose-400">
          Quam nunc nunc eu sed. Sed rhoncus quis ultricies ac pellentesque.
        </p>
      </div>
      <div
        className={`grid ${gridTemplateColumns} gap-6 lg:gap-8 max-w-full place-center`}
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >
        {content.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl bg-gradient-to-tr from-pink-100 to-pink-400 border-b-2 border-pink-500 p-10 shadow-neon shadow-pink-600/80 border-2"
          >
            <h3 className="text-2xl font-semibold leading-7 text-gray-900">
              {item.name}
            </h3>
            <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
              <div>
                <a
                  className="font-semibold text-indigo-600 text-xl"
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.info}
                </a>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
