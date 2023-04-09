-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_author_id_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_chat_id_fkey";

-- DropForeignKey
ALTER TABLE "chat_admin_users" DROP CONSTRAINT "chat_admin_users_chat_id_fkey";

-- DropForeignKey
ALTER TABLE "chat_admin_users" DROP CONSTRAINT "chat_admin_users_user_id_fkey";

-- AddForeignKey
ALTER TABLE "chat_admin_users" ADD CONSTRAINT "chat_admin_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_admin_users" ADD CONSTRAINT "chat_admin_users_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE CASCADE ON UPDATE CASCADE;
