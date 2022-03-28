import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import { XCircleIcon } from "@heroicons/react/outline";

const Book = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [eventType, setEventType] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const router = useRouter();

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = {
        email,
        name,
        startTime,
        endTime,
        title,
        eventType,
        description,
      };
      const res = await axios.post("/api/event", body);
      console.log(`Response: ${JSON.stringify(res.data)}`);
      await router.push("/cal/events");
    } catch (error) {
      console.error(error);
    }
  };

  const routeToBookingsPage = () => {
    router.push("/cal/events");
  };
  return (
    <div>
      <Head>
        <title>Create Booking</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex justify-between max-w-full p-12 text-center flex-nowrap">
        <h3 className="text-2xl font-semibold text-gray-500 cursor-pointer font-comforter">
          SimbaCal.com
        </h3>
        <button
          onClick={routeToBookingsPage}
          className="inline-flex items-center px-4 py-2 mr-2 text-xs font-semibold text-black bg-white border rounded border-green focus:outline-none hover:bg-red-500 hover:text-white"
        >
          Back To Events
          <XCircleIcon className="w-5 h-5 ml-3 text-black" />
        </button>
      </div>
      <div className="flex justify-center h-screen p-8 bg-gray-bg1">
        <form
          className="max-w-xl p-4 rounded-lg shadow-md h-5/6"
          onSubmit={submitData}
        >
          <div className="flex flex-wrap mb-3 -mx-3">
            <div className="w-full px-3 mb-3 md:w-6/12 md:mb-0">
              <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                Name
              </label>
              <input
                className="block w-full px-4 py-3 mb-3 text-xs font-bold leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                value={name}
                required={true}
              />
              {name === "" && (
                <p className="text-xs italic text-red-600 animate-pulse">
                  name cannot be empty
                </p>
              )}
            </div>
            <div className="w-full px-3 mb-3 md:w-6/12 md:mb-0">
              <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                email
              </label>
              <input
                className="block w-full px-4 py-3 mb-3 text-xs font-bold leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="xyz@gmail.com"
                value={email}
                required={true}
              />
              {email === "" && (
                <p className="text-xs italic text-red-600 animate-pulse">
                  email cannot be empty
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap mb-6 -mx-3">
            <div className="w-full px-3 mb-3 md:w-12/12 md:mb-0">
              <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                Title
              </label>
              <input
                className="block w-full px-4 py-3 mb-3 text-xs font-bold leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                value={title}
                required={true}
              />
              {title === "" && (
                <p className="text-xs italic text-red-600 animate-pulse">
                  title cannot be empty
                </p>
              )}
            </div>
            <div className="w-full px-3 mb-3 md:w-12/12 md:mb-0">
              <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                Event Type
              </label>
              <input
                className="block w-full px-4 py-3 mb-3 text-xs font-bold leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="text"
                onChange={(e) => setEventType(e.target.value)}
                placeholder="Event Type"
                value={eventType}
                required={true}
              />
              {eventType === "" && (
                <p className="text-xs italic text-red-600 animate-pulse">
                  Event Type cannot be empty
                </p>
              )}
            </div>
            <div className="w-full px-3 mb-3 md:w-12/12 md:mb-0">
              <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                Description
              </label>
              <textarea
                className="block w-full px-4 py-3 mb-3 text-xs font-bold leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Your Description here"
                value={description}
                required={true}
              />
              {description === "" && (
                <p className="text-xs italic text-red-600 animate-pulse">
                  description cannot be empty
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap mb-2 -mx-3">
            <div className="w-full px-3 mb-6 md:w-6/12 md:mb-0">
              <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                Start Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  className="block w-full px-2 py-3 pr-2 text-xs font-bold leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Select Start date"
                  onChange={(e) => setStartTime(e.target.valueAsDate)}
                />
              </div>
            </div>
            <div className="w-full px-3 mb-6 md:w-6/12 md:mb-0">
              <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                End Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  className="block w-full px-2 py-3 pr-2 text-xs font-bold leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Select End date"
                  onChange={(e) => setEndTime(e.target.valueAsDate)}
                />
              </div>
            </div>
            <div className="w-full px-3">
              <br />
              <br />
              <button
                className="block w-full px-4 py-3 mb-3 text-xs font-bold text-white uppercase bg-black border rounded outline-none hover:bg-white hover:text-black"
                id="grid-password"
                type="submit"
              >
                Book
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Book;
