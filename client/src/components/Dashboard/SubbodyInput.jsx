export default function SubbodyInput({ subBody, setSubBody }) {
  return (
    <div className="col-span-full">
      <label
        htmlFor="subbody"
        className="block text-sm font-medium leading-6 text-rose-200"
      >
        Sub Body
      </label>
      <div className="mt-2">
        <textarea
          id="subbody"
          name="subbody"
          rows={12}
          className="block w-full rounded-md px-2 py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6 shadow-neon shadow-pink-600/80 border-2 border-pink-400"
          onChange={(e) => setSubBody(e.target.value)}
          value={subBody}
        />
      </div>
      <p className="mt-2 text-sm text-pink-200" id="about-description">
        Keep this to one paragraph
      </p>
    </div>
  );
}
