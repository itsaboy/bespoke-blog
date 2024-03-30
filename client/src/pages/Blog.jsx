import { useEffect, useState } from "react";
import TopImage from "../components/TopImage";
import BlogContent from "../components/Blog/BlogContent";
import { blogPage } from "../data/placeholders";

export default function Blog() {
  const [blogPageContent, setBlogPageContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogPage = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/blogPagePost/get");
        if (!response.ok) {
          throw new Error("Failed to fetch content");
        }
        const data = await response.json();
        setBlogPageContent(data[0]);
      } catch (error) {
        console.error("Error fetching content:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPage();
  }, []);

  return (
    <>
    {!blogPageContent ? (
        <TopImage image={blogPage.imageUrls} />
      ) : blogPageContent && !loading ? (
        <TopImage image={blogPageContent.imageUrls} />
      ) : null}
      {!blogPageContent ? (
        <BlogContent title={blogPage.title} body={blogPage.body} />
      ) : blogPageContent && !loading ? (
        <BlogContent title={blogPageContent.title} body={blogPageContent.body} />
      ) : null}
    </>
  );
}
