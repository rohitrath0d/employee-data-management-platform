import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

prisma.$connect()
  .then(() => console.log("Prisma connected"))
  .catch((err) => console.error("Prisma connection error:", err));

export default prisma;
