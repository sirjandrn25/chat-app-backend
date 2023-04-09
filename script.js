const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getUsers = async () => {
  // const chats = await prisma.chat.findMany();
  const result = await prisma.chat.findMany({
    where: {
      users: {
        some: {
          user_id: 4,
        },
      },
    },
  });

  // const users = await prisma['user'].findMany()
};
getUsers();
