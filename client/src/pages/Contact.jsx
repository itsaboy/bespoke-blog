import ContactInfo from "../components/Contact/ContactInfo";
import LocationInfo from "../components/Contact/LocationInfo";

export default function Contact() {
  return (
    <div className="bg-transparent py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-16 lg:mx-0 lg:max-w-none">
          <ContactInfo />
          <LocationInfo />
        </div>
      </div>
    </div>
  );
}
