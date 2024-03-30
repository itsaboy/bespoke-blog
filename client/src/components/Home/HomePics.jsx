import HomeImg from "./HomeImg";
import { portrait } from "../../data/placeholders";

export default function HomePics({ images }) {
  return (
    <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
      {images && images.length > 0 ? (
        <>
          <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
            <HomeImg src={images[0]} alt="" />
          </div>
          <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
            <HomeImg src={images[1]} alt="" />
            <HomeImg src={images[2]} alt="" />
          </div>
          <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
            <HomeImg src={images[3]} alt="" />
            <HomeImg src={images[4]} alt="" />
          </div>
        </>
      ) : (
        <>
          <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
            <HomeImg src={portrait[0].image} alt="" />
          </div>
          <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
            <HomeImg src={portrait[1].image} alt="" />
            <HomeImg src={portrait[2].image} alt="" />
          </div>
          <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
            <HomeImg src={portrait[3].image} alt="" />
            <HomeImg src={portrait[4].image} alt="" />
          </div>
        </>
      )}
    </div>
  );
}
