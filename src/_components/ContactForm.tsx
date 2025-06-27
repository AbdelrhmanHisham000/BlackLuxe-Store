import Row from "./Row";

export default function ContactForm() {
  return (
    <form className="flex flex-col gap-8">
      {/* First row */}
      <div className="flex flex-col gap-6 md:flex-row md:gap-10">
        <Row label="First Name" type="text" />
        <Row label="Last Name" type="text" />
      </div>

      {/* Second row */}
      <div className="flex flex-col gap-6 md:flex-row md:gap-10">
        <Row label="Email" type="email" />
        <Row label="Phone" type="tel" />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-4">
        <label htmlFor="message" className="text-white">
          Leave us a message...
        </label>
        <textarea
          name="message"
          id="message"
          className="w-full resize-none border-b bg-transparent p-2 text-white focus:outline-none"
          rows={4}
        ></textarea>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button className="h-10 w-32 cursor-pointer border text-white transition duration-300 hover:bg-white hover:text-black">
          Submit
        </button>
      </div>
    </form>
  );
}
