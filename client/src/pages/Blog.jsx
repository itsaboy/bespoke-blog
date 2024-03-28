import TopImage from "../components/TopImage";
import BlogContent from "../components/Blog/BlogContent";
import banner from "../assets/images/banner.webp"

export default function Blog() {
  return (
    <>
      <TopImage src={banner} />
      <BlogContent />
    </>
  );
}
