import loadingIcon from "../assets/icons/loading.svg";

export default function TopImage({ image, loading }) {
  return (
    <div className="mt-10 sm:mt-24 xl:mx-auto lg:max-w-7xl px-4">
      <div className="relative grid place-items-center">
        <img
          src={image[0]}
          alt=""
          className="aspect-[21/7] w-full object-cover rounded-3xl shadow-neon shadow-pink-600/80 border-2 border-pink-400"
        />
        {loading && <img src={loadingIcon} className="absolute h-12 w-12" />}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-600 opacity-30 rounded-3xl" />
      </div>
    </div>
  );
}
