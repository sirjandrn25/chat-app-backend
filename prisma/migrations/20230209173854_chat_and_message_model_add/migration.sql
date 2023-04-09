-- AlterTable
ALTER TABLE "profile" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "chats" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "is_group" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatUsers" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "chat_id" INTEGER NOT NULL,

    CONSTRAINT "ChatUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatAminUsers" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "chat_id" INTEGER NOT NULL,

    CONSTRAINT "ChatAminUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "author_id" INTEGER NOT NULL,
    "chat_id" INTEGER NOT NULL,
    "is_deleted" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChatUsers_user_id_key" ON "ChatUsers"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "ChatUsers_chat_id_key" ON "ChatUsers"("chat_id");

-- CreateIndex
CREATE UNIQUE INDEX "ChatAminUsers_user_id_key" ON "ChatAminUsers"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "ChatAminUsers_chat_id_key" ON "ChatAminUsers"("chat_id");

-- CreateIndex
CREATE UNIQUE INDEX "Message_author_id_key" ON "Message"("author_id");

-- CreateIndex
CREATE UNIQUE INDEX "Message_chat_id_key" ON "Message"("chat_id");

-- AddForeignKey
ALTER TABLE "ChatUsers" ADD CONSTRAINT "ChatUsers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatUsers" ADD CONSTRAINT "ChatUsers_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatAminUsers" ADD CONSTRAINT "ChatAminUsers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatAminUsers" ADD CONSTRAINT "ChatAminUsers_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
