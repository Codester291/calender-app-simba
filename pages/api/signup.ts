/* eslint-disable require-jsdoc */
import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcrypt";

const prisma = new PrismaClient();
const handle = async (req: any, res: any) => {
  const { name, username, email, password } = req.body;

  const findUser = await prisma.user.findFirst({
    where: { username: username },
  });

  if (findUser) {
    return res.send({ code: "99", message: "User Already Exists" });
  }

  const response = await prisma.user.create({
    data: {
      name: name,
      username: username,
      email: email,
      password: await hashSync(password, 10),
    },
  });

  return res.status(200).send({ message: "User created", user: response });
};

export default handle;
