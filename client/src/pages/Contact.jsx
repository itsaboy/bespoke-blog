import { useEffect, useState } from "react";
import ContactInfo from "../components/Contact/ContactInfo";
import { contactPage } from "../data/placeholders";

export default function Contact() {
  const [contactPageContent, setContactPageContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContactPage = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/contactPage/get");
        if (!response.ok) {
          throw new Error("Failed to fetch content");
        }
        const data = await response.json();
        setContactPageContent(data);
      } catch (error) {
        console.error("Error fetching content:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContactPage();
  }, []);

  return (
    <div className="bg-transparent py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="mx-auto space-y-16 lg:mx-0 lg:max-w-none flex justify-center">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10">
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-l from-pink-300 to-pink-500">
                Let's Connect!
              </h2>
              <p className="mt-4 leading-7 text-rose-400">
                Your thoughts and messages mean the world to me! Got a question,
                collaboration idea, or just want to share some love? I'm all
                ears. Drop me a line right here, and I promise to get back to
                you as soon as I can. Your support fuels my creativity and keeps
                this journey exciting!
              </p>
              {!contactPageContent || contactPageContent.length < 1 ? (
                <ContactInfo content={contactPage} />
              ) : contactPageContent && !loading ? (
                <ContactInfo content={contactPageContent} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
