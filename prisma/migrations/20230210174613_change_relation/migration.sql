/*
  Warnings:

  - You are about to drop the `ChatAminUsers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ChatUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChatAminUsers" DROP CONSTRAINT "ChatAminUsers_chat_id_fkey";

-- DropForeignKey
ALTER TABLE "ChatAminUsers" DROP CONSTRAINT "ChatAminUsers_user_id_fkey";

-- DropForeignKey
ALTER TABLE "ChatUsers" DROP CONSTRAINT "ChatUsers_chat_id_fkey";

-- DropForeignKey
ALTER TABLE "ChatUsers" DROP CONSTRAINT "ChatUsers_user_id_fkey";

-- DropTable
DROP TABLE "ChatAminUsers";

-- DropTable
DROP TABLE "ChatUsers";

-- CreateTable
CREATE TABLE "chat_users" (
    "user_id" INTEGER NOT NULL,
    "chat_id" INTEGER NOT NULL,

    CONSTRAINT "chat_users_pkey" PRIMARY KEY ("user_id","chat_id")
);

-- CreateTable
CREATE TABLE "chat_admin_users" (
    "user_id" INTEGER NOT NULL,
    "chat_id" INTEGER NOT NULL,

    CONSTRAINT "chat_admin_users_pkey" PRIMARY KEY ("user_id","chat_id")
);

-- AddForeignKey
ALTER TABLE "chat_users" ADD CONSTRAINT "chat_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_users" ADD CONSTRAINT "chat_users_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_admin_users" ADD CONSTRAINT "chat_admin_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_admin_users" ADD CONSTRAINT "chat_admin_users_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
