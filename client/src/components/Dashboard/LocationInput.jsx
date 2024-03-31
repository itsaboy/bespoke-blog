export default function LocationInput({ location, setLocation }) {
  return (
    <div className="col-span-full">
      <label
        htmlFor="location"
        className="block text-sm font-medium leading-6 text-rose-200"
      >
        Location
      </label>
      <div className="mt-2">
        <textarea
          id="location"
          name="location"
          rows={1}
          className="block w-full rounded-md px-2 py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6 shadow-neon shadow-pink-600/80 border-2 border-pink-400"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          required={true}
        />
      </div>
      <p className="mt-2 text-sm text-pink-200" id="email-description">
        Use location hierarchy format
      </p>
    </div>
  );
}
