-- DropForeignKey
ALTER TABLE "chat_users" DROP CONSTRAINT "chat_users_chat_id_fkey";

-- DropForeignKey
ALTER TABLE "chat_users" DROP CONSTRAINT "chat_users_user_id_fkey";

-- AddForeignKey
ALTER TABLE "chat_users" ADD CONSTRAINT "chat_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_users" ADD CONSTRAINT "chat_users_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE CASCADE ON UPDATE CASCADE;
