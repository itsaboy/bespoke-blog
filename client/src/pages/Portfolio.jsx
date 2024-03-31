import { useEffect, useState } from "react";
import TopImage from "../components/TopImage";
import ContentList from "../components/Portfolio/ContentList";
import { galleryPage } from "../data/placeholders";

export default function Portfolio() {
  const [galleryPageContent, setGalleryPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGalleryPage = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/galleryPagePost/get");
        if (!response.ok) {
          throw new Error("Failed to fetch content");
        }
        const data = await response.json();
        setGalleryPageContent(data[0]);
      } catch (error) {
        console.error("Error fetching content:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryPage();
  }, []);

  return (
    <>
      {!galleryPageContent ? (
        <TopImage image={galleryPage.imageUrls} loading={loading} />
      ) : galleryPageContent && !loading ? (
        <TopImage image={galleryPageContent.imageUrls} />
      ) : null}
      {!galleryPageContent ? (
        <ContentList title={galleryPage.title} body={galleryPage.body} />
      ) : galleryPageContent && !loading ? (
        <ContentList
          title={galleryPageContent.title}
          body={galleryPageContent.body}
        />
      ) : null}
    </>
  );
}
