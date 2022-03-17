import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const hello = async (req: any, res: any) => {
  const response = await prisma.user.findMany();
  return res.status(200).send({ message: "successful", user: response });
};

export default hello;
