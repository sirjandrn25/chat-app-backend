-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_user_id_fkey";

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
