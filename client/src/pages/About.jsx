import { useEffect, useState } from "react";
import AboutText from "../components/About/AboutText";
import AboutPics from "../components/About/AboutPics";
import { aboutPage } from "../data/placeholders";

export default function About() {
  const [aboutPageContent, setAboutPageContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAboutPage = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/aboutPagePost/get");
        if (!response.ok) {
          throw new Error("Failed to fetch content");
        }
        const data = await response.json();
        setAboutPageContent(data[0]);
      } catch (error) {
        console.error("Error fetching content:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutPage();
  }, []);

  return (
    <div className="pt-32 overflow-hidden sm:pt-40 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
          <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
            {!aboutPageContent ? (
              <AboutText
                title={aboutPage.title}
                body={aboutPage.body}
                subBody={aboutPage.subBody}
              />
            ) : aboutPageContent && !loading ? (
              <AboutText
                title={aboutPageContent.title}
                body={aboutPageContent.body}
                subBody={aboutPageContent.subBody}
              />
            ) : null}
          </div>
          {!aboutPageContent ? (
            <AboutPics images={aboutPage.imageUrls} loading={loading} />
          ) : aboutPageContent && !loading ? (
            <AboutPics images={aboutPageContent.imageUrls} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
