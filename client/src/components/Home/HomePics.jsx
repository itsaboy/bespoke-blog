import HomeImg from "./HomeImg";
import home1 from "../../assets/images/home1.webp";
import home2 from "../../assets/images/home2.webp";
import home3 from "../../assets/images/home3.webp";
import home4 from "../../assets/images/home4.webp";
import home5 from "../../assets/images/home5.webp";

export default function HomePics() {
  return (
    <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
      <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
        <HomeImg src={home1} alt="" />
      </div>
      <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
        <HomeImg src={home2} alt="" />
        <HomeImg src={home3} alt="" />
      </div>
      <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
        <HomeImg src={home4} alt="" />
        <HomeImg src={home5} alt="" />
      </div>
    </div>
  );
}
