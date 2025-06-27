import ContactForm from "@/src/_components/ContactForm";

export const metadata = {
  title: "Contact Us | BlackLuxe",
  description:
    "Get in touch with us for inquiries, support, or feedback. We’d love to hear from you.",
};

export default function Page() {
  return (
    <div className="flex flex-col-reverse gap-12 p-6 md:flex-row md:gap-10 md:p-20">
      {/* Left Section */}
      <div className="flex flex-col items-center text-center md:basis-1/2 md:items-start md:text-left">
        <p className="text-3xl font-semibold text-white">Contact Us</p>
        <p className="mt-4 text-base text-gray-300 md:text-lg">
          Have questions or need assistance? We’re here to help! Reach out to
          us, and we’ll get back to you as soon as possible. Your feedback
          matters—let’s connect today!
        </p>
      </div>

      {/* Right Section */}
      <div className="w-full md:flex-1">
        <ContactForm />
      </div>
    </div>
  );
}
