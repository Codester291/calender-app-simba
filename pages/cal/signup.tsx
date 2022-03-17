import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import Router from "next/router";

const SignUp = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { name, username, email, password };
      const res = await axios.post("/api/signup", body);

      const { code } = res.data;
      if (code == "99") {
        window.alert("User Already Exists");
      } else {
        await Router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Head>
        <title>Create An Account</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex h-screen bg-gray-bg1">
        <div className="flex justify-between w-10/12 px-16 py-4 m-auto bg-white rounded-lg h-5/6">
          <div className="flex justify-start w-10/12 px-32 py-16 m-auto mr-5 bg-white h-5/6">
            <div>
              <h1 className="font-mono text-2xl font-bold text-primary">
                SimbaCal.com
              </h1>
              <br />
              <br />
              <h1 className="font-bold text-8xl text-primary">
                You&apos;re one
                <br /> step away from simpler scheduling
              </h1>
              <br />
              <img
                src="https://cdn.dribbble.com/users/4187655/screenshots/15568499/media/aeceb559af3f7b5285d30efaa6fd5b97.png"
                className="w-11/12 bg-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
          <div className="flex justify-center w-7/12 px-16 py-32 m-auto mr-5 bg-white border rounded-lg h-5/6">
            <div>
              <h1 className="text-5xl font-bold text-primary">
                Sign Up For A Free Account
              </h1>
              <hr className="border-b-4 border-yellow-400" />
              <br />
              <br />
              <br />
              <br />
              <form>
                <div>
                  <label htmlFor="name" className="font-bold">
                    Name
                  </label>
                  <input
                    type="text"
                    className={`w-full p-5 text-primary border outline-none text-sm transition duration-150 ease-in-out mb-4`}
                    id="name"
                    placeholder="******"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                  />
                </div>
                <br />
                <div>
                  <label htmlFor="username" className="font-bold">
                    Username
                  </label>
                  <input
                    type="text"
                    className={`w-full p-5 text-primary border outline-none text-sm transition duration-150 ease-in-out mb-4`}
                    id="username"
                    placeholder="******"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                  />
                </div>
                <br />
                <div>
                  <label htmlFor="email" className="font-bold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full p-5 text-primary border outline-none text-sm transition duration-150 ease-in-out mb-4`}
                    id="email"
                    placeholder="******"
                    value={email}
                    required
                  />
                </div>
                <br />
                <div>
                  <label htmlFor="password" className="font-bold">
                    Password
                  </label>
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full p-5 text-primary border outline-none text-sm transition duration-150 ease-in-out mb-4`}
                    id="password"
                    placeholder="******"
                    value={password}
                    required
                  />
                </div>
                <br />
                <div>
                  <button
                    type="submit"
                    onClick={submitData}
                    className="w-full px-8 py-3.5 text-lg font-bold text-white bg-black border rounded border-green focus:outline-none hover:bg-white hover:text-black"
                  >
                    Sign Up
                  </button>
                </div>
                <div className="flex justify-center">
                  <span className="text-center">
                    Already have an account?
                    <Link href={"/"}>
                      <a className="font-bold">&nbsp; Sign In</a>
                    </Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
