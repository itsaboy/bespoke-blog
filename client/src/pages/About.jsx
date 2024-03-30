import { useEffect, useState } from "react";
import AboutPics from "../components/About/AboutPics";
import loadingIcon from "../assets/icons/loading.svg";

export default function About() {
  const [aboutPageContent, setAboutPageContent] = useState({});
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
            {!aboutPageContent && (
              <>
                <h2 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-l from-pink-300 to-pink-500 sm:text-4xl">
                  About Page Title
                </h2>
                <p className="mt-6 text-xl leading-8 text-rose-300">
                  About Page Body
                </p>
                <p className="mt-6 text-lg leading-7 text-pink-300">
                  ABout Page Subbody
                </p>
              </>
            )}
            {aboutPageContent && !loading && (
              <>
                <h2 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-l from-pink-300 to-pink-500 sm:text-4xl">
                  {aboutPageContent.title}
                </h2>
                <p className="mt-6 text-xl leading-8 text-rose-300">
                  {aboutPageContent.body}
                </p>
                <p className="mt-6 text-lg leading-7 text-pink-300">
                  {aboutPageContent.subBody}
                </p>
              </>
            )}
          </div>
          {aboutPageContent ? (
            <AboutPics images={aboutPageContent.imageUrls} />
          ) : (
            <AboutPics />
          )}
        </div>
      </div>
    </div>
  );
}
