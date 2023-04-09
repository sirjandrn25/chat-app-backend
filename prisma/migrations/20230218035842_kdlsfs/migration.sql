/*
  Warnings:

  - You are about to drop the column `user_id` on the `messages` table. All the data in the column will be lost.
  - Added the required column `author_id` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_chat_id_user_id_fkey";

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "user_id",
ADD COLUMN     "author_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_chat_id_author_id_fkey" FOREIGN KEY ("chat_id", "author_id") REFERENCES "chat_users"("user_id", "chat_id") ON DELETE CASCADE ON UPDATE CASCADE;
