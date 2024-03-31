import { useEffect, useState } from "react";
import HomeText from "../components/Home/HomeText";
import HomePics from "../components/Home/HomePics";
import { homePage } from "../data/placeholders";

export default function Home() {
  const [homePageContent, setHomePageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHomePage = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/homePagePost/get");
        if (!response.ok) {
          throw new Error("Failed to fetch content");
        }
        const data = await response.json();
        setHomePageContent(data[0]);
      } catch (error) {
        console.error("Error fetching content:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHomePage();
  }, []);

  return (
    <div className="overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pb-32 pt-10 sm:pt-60 lg:px-8 lg:pt-32">
        <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
          <div className="relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
            {!homePageContent ? (
              <HomeText title={homePage.title} body={homePage.body} />
            ) : homePageContent && !loading ? (
              <HomeText
                title={homePageContent.title}
                body={homePageContent.body}
              />
            ) : null}
          </div>
          {!homePageContent ? (
            <HomePics images={homePage.imageUrls} loading={loading} />
          ) : homePageContent && !loading ? (
            <HomePics images={homePageContent.imageUrls} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
