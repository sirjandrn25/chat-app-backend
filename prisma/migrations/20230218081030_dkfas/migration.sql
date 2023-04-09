-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_chat_id_author_id_fkey";

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_chat_id_author_id_fkey" FOREIGN KEY ("chat_id", "author_id") REFERENCES "chat_users"("chat_id", "user_id") ON DELETE CASCADE ON UPDATE CASCADE;
