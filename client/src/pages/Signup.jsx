import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup.js";
import signupIcon from "../assets/icons/signup.svg";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, signupError, setSignupError, signupLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(username, email, password);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 pb-32 pt-10 sm:pt-60 lg:px-8 lg:pt-32">
      <div className="flex min-h-full flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                className="h-10 w-auto"
                src={signupIcon}
                alt="Your Company"
              />
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-transparent bg-clip-text bg-gradient-to-l from-pink-300 to-pink-500">
                Create a new account
              </h2>
              <p className="mt-2 text-sm leading-6 text-pink-300">
                Already a member?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-pink-200 hover:text-indigo-500"
                >
                  Login!
                </Link>
              </p>
            </div>

            <div className="mt-10">
              <div>
                <form
                  method="POST"
                  className="space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-rose-400"
                    >
                      Username
                    </label>
                    <div className="mt-2">
                      <input
                        id="username"
                        name="username"
                        type="username"
                        autoComplete="username"
                        required
                        className="px-2 block w-full rounded-md py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6 shadow-neon shadow-pink-600/80 border-2 border-pink-400"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-rose-400"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full rounded-md px-2 py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6 shadow-neon shadow-pink-600/80 border-2 border-pink-400"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-rose-400"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md px-2 py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6 shadow-neon shadow-pink-600/80 border-2 border-pink-400"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                    </div>
                  </div>

                  <br />

                  <div className="flex flex-row justify-between items-center">
                    <button
                      type="submit"
                      className="px-4 sm:px-10 py-2 bg-gradient-to-l from-pink-200 to-pink-400 border-2 border-pink-400 rounded-2xl shadow-neon shadow-pink-400/60 hover:bg-gradient-to-r hover:shadow-neon hover:shadow-pink-200/60 hover:border-pink-200"
                    >
                      <div className="flex justify-between items-center text-sm sm:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-rose-800">
                        Signup
                        <img
                          src={signupIcon}
                          className="hidden sm:block h-4 w-4 sm:h-6 sm:w-6 text-rose-800"
                        />
                      </div>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover rounded-3xl shadow-neon shadow-pink-600/80 border-2 border-pink-400"
            src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-600 opacity-40 rounded-3xl" />
        </div>
      </div>
    </div>
  );
}
