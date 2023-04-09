-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_author_id_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_chat_id_fkey";

-- DropIndex
DROP INDEX "Message_author_id_key";

-- DropIndex
DROP INDEX "Message_chat_id_key";

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chat_id_author_id_fkey" FOREIGN KEY ("chat_id", "author_id") REFERENCES "chat_users"("user_id", "chat_id") ON DELETE CASCADE ON UPDATE CASCADE;
