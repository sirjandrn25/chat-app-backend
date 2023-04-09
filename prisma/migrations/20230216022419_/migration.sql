/*
  Warnings:

  - You are about to drop the `chat_admin_users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "chat_admin_users" DROP CONSTRAINT "chat_admin_users_chat_id_fkey";

-- DropForeignKey
ALTER TABLE "chat_admin_users" DROP CONSTRAINT "chat_admin_users_user_id_fkey";

-- AlterTable
ALTER TABLE "chat_users" ADD COLUMN     "is_admin" BOOLEAN DEFAULT false;

-- DropTable
DROP TABLE "chat_admin_users";
