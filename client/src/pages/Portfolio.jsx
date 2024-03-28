import TopImage from "../components/TopImage";
import ContentList from "../components/Portfolio/ContentList";
import banner from "../assets/images/banner.webp"

export default function Portfolio() {
  return (
    <>
      <TopImage src={banner} />
      <ContentList />     
    </>
  );
}
