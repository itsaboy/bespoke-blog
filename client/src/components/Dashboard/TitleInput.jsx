export default function TitleInput({ title, setTitle }) {
  return (
    <div className="col-span-full">
      <label
        htmlFor="about"
        className="block text-sm font-medium leading-6 text-rose-200"
      >
        Title
      </label>
      <div className="mt-2">
        <textarea
          id="about"
          name="about"
          rows={1}
          className="block w-full rounded-md px-2 py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6 shadow-neon shadow-pink-600/80 border-2 border-pink-400"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
      <p className="mt-2 text-sm text-pink-200" id="about-description">
        A title should be short and sweet
      </p>
    </div>
  );
}
