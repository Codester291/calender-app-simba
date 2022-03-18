/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import React from "react";
import "tailwindcss/tailwind.css";
import Head from "next/head";
import { TabGroup } from "@statikly/funk";
import { getSession, signOut } from "next-auth/client";
import { PrismaClient } from "@prisma/client";
import { ClockIcon, XCircleIcon } from "@heroicons/react/outline";
import moment from "moment";

export const getServerSideProps = async (context: any) => {
  const prisma = new PrismaClient();
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email!,
    },
    select: {
      id: true,
      email: true,
    },
  });
  console.log(`User: ${user?.email}`);

  const bookings = await prisma.booking.findMany({
    where: {
      userId: user?.id,
    },
  });

  return {
    props: { session, bookings: JSON.parse(JSON.stringify(bookings)), user },
  };
};

const BookingPage = ({
  session,
  bookings,
  user,
}: {
  session: any;
  bookings: any;
  user: any;
}) => {
  const logOut = () => {
    signOut({
      callbackUrl: `${window.location.origin}/`,
    });
  };
  return (
    <div>
      <Head>
        <title>Booking</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex-col h-screen p-24 bg-gray-bg1">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Bookings</h1>

          <div className="flex flex-row">
            <button
              type="submit"
              className="px-2 py-2 text-xs font-semibold text-white bg-black border rounded border-green focus:outline-none hover:bg-white hover:text-black"
            >
              Create An Event
            </button>
            <button
              onClick={logOut}
              className="px-2 py-2 text-xs font-semibold text-white bg-red-500 border rounded border-green focus:outline-none hover:bg-white hover:text-black"
            >
              Sign Out
            </button>
          </div>
        </div>
        <span className="text-sm opacity-30">
          See upcoming and past events booked through your event type links
        </span>
        <br />
        <br />
        <br />
        <div>
          <TabGroup numTabs={3} direction={TabGroup.direction.HORIZONTAL}>
            <TabGroup.TabList>
              <TabGroup.Tab
                index={0}
                className="h-12 px-4 text-sm transition-colors duration-150 outline-none"
                activeClassName="border-b-4 border-yellow-400"
                inactiveClassName="text-black"
              >
                Upcoming
              </TabGroup.Tab>
              <TabGroup.Tab
                index={1}
                className="h-12 px-4 text-sm transition-colors duration-150 outline-none"
                activeClassName="border-b-4 border-yellow-400"
                inactiveClassName="text-black"
              >
                Past
              </TabGroup.Tab>
              <TabGroup.Tab
                index={2}
                className="h-12 px-4 text-sm transition-colors duration-150 outline-none"
                activeClassName="border-b-4 border-yellow-400"
                inactiveClassName="text-black"
              >
                Cancelled
              </TabGroup.Tab>
            </TabGroup.TabList>
            <hr />
            <TabGroup.TabPanel
              index={0}
              className="h-64 p-8 transition-all transform"
              activeClassName="opacity-100 duration-500 translate-x-0"
              inactiveClassName="absolute opacity-0 -translate-x-2"
            >
              {bookings.map((booking: any) => (
                <div
                  className="flex justify-between w-full p-8 mb-6 rounded-lg shadow-md"
                  key={booking?.id}
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-bold">
                      {moment(booking.createdAt).format("ddd, MMM yyyy")}
                    </span>
                    <span className="text-xs font-semibold opacity-20">
                      {moment(booking.startTime).format("hh:mma")} -{" "}
                      {moment(booking.endTime).format("hh:mma")}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold">{booking?.title}</span>
                  </div>
                  <div className="flex flex-row">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 mr-2 text-xs font-semibold text-black bg-white border rounded border-green focus:outline-none hover:bg-gray-500 hover:text-white"
                    >
                      <XCircleIcon className="w-5 h-5 mr-3 text-black" />
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 text-xs font-semibold text-black bg-white border rounded border-green focus:outline-none hover:bg-gray-500 hover:text-white"
                    >
                      <ClockIcon className="w-5 h-5 mr-3 text-black" />
                      Reschedule
                    </button>
                  </div>
                </div>
              ))}
            </TabGroup.TabPanel>
            <TabGroup.TabPanel
              index={1}
              className="flex flex-col h-64 p-16 transition-all transform"
              activeClassName="opacity-100 duration-500 translate-x-0"
              inactiveClassName="absolute opacity-0 -translate-x-2"
            >
              <label className="mb-1 font-semibold" htmlFor="input">
                Input
              </label>
              <input
                id="input"
                type="text"
                className="h-12 px-8 border border-gray-400"
                placeholder="Focus me!"
              />
            </TabGroup.TabPanel>
            <TabGroup.TabPanel
              index={2}
              className="h-64 p-16 transition-all transform"
              activeClassName="opacity-100 duration-500 translate-x-0"
              inactiveClassName="absolute opacity-0 -translate-x-2"
            >
              Content 3
            </TabGroup.TabPanel>
          </TabGroup>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
