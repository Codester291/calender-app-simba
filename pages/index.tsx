/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import Head from "next/head";
import Link from "next/link";
import { getCsrfToken, signIn, useSession } from "next-auth/client";
import Router from "next/router";

export async function getServerSideProps(context: any) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
const LandingPage = ({ csrfToken }: { csrfToken: any }) => {
  const [session] = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitData = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    signIn("credentials", {
      username,
      password,
    });

    if (session) {
      Router.push("/");
    }
  };
  return (
    <div>
      <Head>
        <title>Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex h-screen bg-gray-bg1">
        <div className="w-10/12 max-w-xl px-4 py-4 m-auto bg-cover border rounded-lg bg-notes">
          <h1 className="text-lg font-bold text-center text-primary">
            SimbaCal.com
          </h1>
          <br />
          <h1 className="text-2xl font-bold text-center text-primary">
            Sign in to your Account
          </h1>
          <br />
          <div className="w-9/12 max-w-lg px-8 py-4 m-auto bg-white border rounded-lg">
            <form onSubmit={submitData}>
              <div>
                <label htmlFor="username" className="text-xs font-bold">
                  Username
                </label>
                <input
                  name="csrfToken"
                  type="hidden"
                  defaultValue={csrfToken}
                />
                <input
                  type="username"
                  className={`w-full p-2 text-primary border outline-none text-sm transition duration-150 ease-in-out mb-4`}
                  id="username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  required
                />
              </div>
              <br />
              <div>
                <div className="flex justify-between">
                  <label htmlFor="password" className="text-xs font-bold">
                    Password
                  </label>
                  <span className="text-xs font-bold">Forgot?</span>
                </div>
                <input
                  type="password"
                  className={`w-full p-2 text-primary border outline-none text-sm transition duration-150 ease-in-out mb-4`}
                  id="password"
                  placeholder="******"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </div>
              <br />
              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-3 text-xs font-bold text-white bg-black border rounded border-green focus:outline-none hover:bg-white hover:text-black"
                >
                  Sign in
                </button>
              </div>
              <br />
              <div className="flex justify-center">
                <span className="text-xs text-center">
                  Do not have an account?
                  <Link href={"/cal/signup"}>
                    <a className="font-bold">&nbsp; Create An Account</a>
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
