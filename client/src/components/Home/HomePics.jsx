import HomeImg from "./HomeImg";
import loadingIcon from "../../assets/icons/loading.svg";

export default function HomePics({ images, loading }) {
  return (
    <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
      <>
        <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
          <div className="grid place-items-center">
            <HomeImg src={images[0]} alt="" />
            {loading && (
              <img src={loadingIcon} className="absolute h-12 w-12" />
            )}
          </div>
        </div>
        <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
          <div className="grid place-items-center">
            <HomeImg src={images[1]} alt="" />
            {loading && (
              <img src={loadingIcon} className="absolute h-12 w-12" />
            )}
          </div>
          <div className="grid place-items-center">
            <HomeImg src={images[2]} alt="" />
            {loading && (
              <img src={loadingIcon} className="absolute h-12 w-12" />
            )}
          </div>
        </div>
        <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
          <div className="grid place-items-center">
            <HomeImg src={images[3]} alt="" />
            {loading && (
              <img src={loadingIcon} className="absolute h-12 w-12" />
            )}
          </div>
          <div className="grid place-items-center">
            <HomeImg src={images[4]} alt="" />
            {loading && (
              <img src={loadingIcon} className="absolute h-12 w-12" />
            )}
          </div>
        </div>
      </>
    </div>
  );
}
