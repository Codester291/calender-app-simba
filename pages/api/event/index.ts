import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/client";

const handle = async (req, res) => {
  const prisma = new PrismaClient();
  const { startTime, endTime, title, description, eventType } = req.body;

  const session = await getSession({ req });
  const loggedInUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  const eventTypeObj = await prisma.eventType.create({
    data: {
      type: eventType,
    },
  });

  const event = await prisma.event.create({
    data: {
      title: title,
      description: description,
      startTime: startTime,
      endTime: endTime,
      owner: { connect: { id: loggedInUser.id } },
      eventType: { connect: { id: eventTypeObj.id } },
    },
    include: {
      owner: true,
    },
  });

  return res.json({ event: event });
};

export default handle;
