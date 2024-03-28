export default function LocationInfo() {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 pt-16 lg:grid-cols-3">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-l from-rose-300 to-rose-500">
          Locations
        </h2>
        <p className="mt-4 leading-7 text-pink-400">
          Consequat sunt cillum cillum elit sint. Qui occaecat nisi in ipsum
          commodo.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
        <div className="rounded-2xl bg-gradient-to-tr from-rose-100 to-rose-400 border-b-2 border-rose-500 p-10 shadow-neon shadow-rose-600/80 border-2">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Los Angeles
          </h3>
          <address className="mt-3 space-y-1 text-sm not-italic leading-6 text-gray-600">
            <p>4556 Brendan Ferry</p>
            <p>Los Angeles, CA 90210</p>
          </address>
        </div>
        <div className="rounded-2xl bg-gradient-to-tr from-rose-100 to-rose-400 border-b-2 border-rose-500 p-10 shadow-neon shadow-rose-600/80 border-2">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            New York
          </h3>
          <address className="mt-3 space-y-1 text-sm not-italic leading-6 text-gray-600">
            <p>886 Walter Street</p>
            <p>New York, NY 12345</p>
          </address>
        </div>
        <div className="rounded-2xl bg-gradient-to-tr from-rose-100 to-rose-400 border-b-2 border-rose-500 p-10 shadow-neon shadow-rose-600/80 border-2">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Toronto
          </h3>
          <address className="mt-3 space-y-1 text-sm not-italic leading-6 text-gray-600">
            <p>7363 Cynthia Pass</p>
            <p>Toronto, ON N3Y 4H8</p>
          </address>
        </div>
        <div className="rounded-2xl bg-gradient-to-tr from-rose-100 to-rose-400 border-b-2 border-rose-500 p-10 shadow-neon shadow-rose-600/80 border-2">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Chicago
          </h3>
          <address className="mt-3 space-y-1 text-sm not-italic leading-6 text-gray-600">
            <p>726 Mavis Island</p>
            <p>Chicago, IL 60601</p>
          </address>
        </div>
      </div>
    </div>
  );
}
