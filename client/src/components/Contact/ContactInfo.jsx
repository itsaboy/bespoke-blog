export default function ContactInfo() {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-l from-pink-300 to-pink-500 ">
          Get in touch
        </h2>
        <p className="mt-4 leading-7 text-rose-400">
          Quam nunc nunc eu sed. Sed rhoncus quis ultricies ac pellentesque.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
        <div className="rounded-2xl bg-gradient-to-tr from-pink-100 to-pink-400 border-b-2 border-pink-500 p-10 shadow-neon shadow-pink-600/80 border-2">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Collaborate
          </h3>
          <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
            <div>
              <dt className="sr-only">Email</dt>
              <dd>
                <a
                  className="font-semibold text-indigo-600"
                  href="mailto:collaborate@example.com"
                >
                  collaborate@example.com
                </a>
              </dd>
            </div>
            <div className="mt-1">
              <dt className="sr-only">Phone number</dt>
              <dd>+1 (555) 905-2345</dd>
            </div>
          </dl>
        </div>
        <div className="rounded-2xl bg-gradient-to-tr from-pink-100 to-pink-400 border-b-2 border-pink-500 p-10 shadow-neon shadow-pink-600/80 border-2">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Press
          </h3>
          <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
            <div>
              <dt className="sr-only">Email</dt>
              <dd>
                <a
                  className="font-semibold text-indigo-600"
                  href="mailto:press@example.com"
                >
                  press@example.com
                </a>
              </dd>
            </div>
            <div className="mt-1">
              <dt className="sr-only">Phone number</dt>
              <dd>+1 (555) 905-3456</dd>
            </div>
          </dl>
        </div>
        <div className="rounded-2xl bg-gradient-to-tr from-pink-100 to-pink-400 border-b-2 border-pink-500 p-10 shadow-neon shadow-pink-600/80 border-2">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Join our team
          </h3>
          <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
            <div>
              <dt className="sr-only">Email</dt>
              <dd>
                <a
                  className="font-semibold text-indigo-600"
                  href="mailto:careers@example.com"
                >
                  careers@example.com
                </a>
              </dd>
            </div>
            <div className="mt-1">
              <dt className="sr-only">Phone number</dt>
              <dd>+1 (555) 905-4567</dd>
            </div>
          </dl>
        </div>
        <div className="rounded-2xl bg-gradient-to-tr from-pink-100 to-pink-400 border-b-2 border-pink-500 p-10 shadow-neon shadow-pink-600/80 border-2">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Say hello
          </h3>
          <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
            <div>
              <dt className="sr-only">Email</dt>
              <dd>
                <a
                  className="font-semibold text-indigo-600"
                  href="mailto:hello@example.com"
                >
                  hello@example.com
                </a>
              </dd>
            </div>
            <div className="mt-1">
              <dt className="sr-only">Phone number</dt>
              <dd>+1 (555) 905-5678</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
