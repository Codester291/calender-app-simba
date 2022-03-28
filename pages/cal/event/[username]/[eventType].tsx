/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import React from "react";
import "tailwindcss/tailwind.css";
import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: {
      username: "juice",
    },
  });
  const event = await prisma.event.findFirst({
    where: {
      AND: [{ eventTypeId: Number(params.eventType) }, { userId: user.id }],
    },
    include: {
      owner: true,
      eventType: true,
    },
  });
  console.log(`Event Type: ${event.eventType}`);
  return {
    props: event,
  };
};

const AttendeeInfo = (props) => {
  return (
    <div>
      <Head>
        <title>Event Details</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex h-screen bg-gray-bg1">
        <div className="flex w-10/12 max-w-xl px-4 py-4 m-auto bg-cover border rounded-lg shadow-lg justify-items-start">
          <h1 className="text-lg font-bold text-center text-primary">
            {props.title}
          </h1>
          <h1 className="text-xs font-bold text-center text-primary">
            {props.owner.name}
          </h1>
          <h1 className="text-xs font-bold text-center text-primary">
            {props.owner.email}
          </h1>
          <hr />
          <h1 className="text-xs font-bold text-center text-primary">
            Meeting Link:{" "}
            <a
              href={`${window.location.origin}/${props.owner.username}/${props.eventType.type}`}
            >{`${window.location.origin}/${props.owner.username}/${props.eventType.type}`}</a>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default AttendeeInfo;
