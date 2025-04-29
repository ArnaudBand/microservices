import { PrismaClient } from '@prisma/client';

// Instantiate Prisma client with global handling to prevent multiple instances
declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient({
  log: ['query', 'error']
});

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;