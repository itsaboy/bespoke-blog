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
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-16 lg:mx-0 lg:max-w-none flex justify-center">
          {!contactPageContent || contactPageContent.length < 1 ? (
            <ContactInfo content={contactPage} />
          ) : contactPageContent && !loading ? (
            <ContactInfo content={contactPageContent} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
