// import { PrismaClient } from "@prisma/client";

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// const prisma = global.prisma || new PrismaClient();

// if (process.env.NODE_ENV === "development") global.prisma = prisma;

// export default prisma;

import * as Prisma from "@fardeenes7/unidemy-prisma";

const { prisma } = await Prisma.createContext();

export default prisma;
