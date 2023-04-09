-- CreateTable
CREATE TABLE "messages" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "chat_id" INTEGER NOT NULL,
    "is_deleted" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_chat_id_user_id_fkey" FOREIGN KEY ("chat_id", "user_id") REFERENCES "chat_users"("user_id", "chat_id") ON DELETE CASCADE ON UPDATE CASCADE;
