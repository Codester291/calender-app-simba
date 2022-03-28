/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import React from "react";
import "tailwindcss/tailwind.css";
import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const prisma = new PrismaClient();
  const event = await prisma.event.findUnique({
    where: {
      id: Number(params.eventId),
    },
    include: {
      owner: true,
      eventType: true,
    },
  });
  return {
    props: event,
  };
};

const EventInfo = (props) => {
  return (
    <div>
      <Head>
        <title>Event Details</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex h-screen bg-gray-bg1">
        {/* <div className="flex justify-between max-w-xl p-8 m-auto text-left bg-white bg-cover border rounded-lg shadow-lg"> */}
        <div className="flex flex-col justify-start w-10/12 max-w-xl p-8 m-auto text-left bg-cover border rounded-lg shadow-lg">
          <h1 className="text-lg font-bold text-center text-primary">
            {props.title}
          </h1>
          <h1 className="text-xs font-bold text-center opacity-20 text-primary">
            {props.owner.name}
          </h1>
          <h1 className="text-xs font-bold text-center text-primary">
            {props.owner.email}
          </h1>
          <a
            href={`${window.location.origin}/${props.owner.username}/${props.eventType.type}`}
            className={"text-yellow-400"}
          >
            <h1 className="text-xs font-bold text-center text-primary">
              Meeting Link:{" "}
              {`${window.location.origin}/event/${props.owner.username}/${props.eventType.type}`}
            </h1>
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventInfo;
