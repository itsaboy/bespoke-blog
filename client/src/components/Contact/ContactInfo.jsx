import loadingIcon from "../../assets/icons/loading.svg";

export default function ContactInfo({ content, loading }) {
  const columns = Math.ceil(content.length / 4);
  const gridTemplateColumns = `grid-cols-${columns}`;

  return (
    <div
      className={`grid ${gridTemplateColumns} gap-6 lg:gap-8 max-w-md mx-auto place-center mt-8`}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {content.map((item, index) => (
        <div
          key={index}
          className="rounded-2xl bg-gradient-to-tr from-pink-100 to-pink-400 border-b-2 border-pink-500 p-10 shadow-neon shadow-pink-600/80 border-2 hover:scale-105 ease-in-out duration-300 hover:-skew-y-3 hover:rotate-3 transform-gpu transition-transform place-items-start"
        >
          <div className="grid">
            <h3 className="text-2xl font-semibold leading-7 text-rose-800">
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
            {loading && (
              <img
                src={loadingIcon}
                className="absolute h-12 w-12 place-self-end hidden sm:block"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
