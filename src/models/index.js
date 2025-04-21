const { PrismaClient } = require('@prisma/client');

// Create a singleton Prisma client instance
const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === 'development'
      ? ['query', 'error', 'warn']
      : ['error'],
});

// Handle Prisma client connection errors
prisma.$on('error', (e) => {
  console.error('Prisma Client Error:', e);
});

// Graceful shutdown - close the Prisma client connection
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

module.exports = { prisma };
