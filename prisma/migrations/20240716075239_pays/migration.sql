/*
  Warnings:

  - You are about to drop the column `age` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Person` table. All the data in the column will be lost.
  - Added the required column `country` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Person" DROP COLUMN "age",
DROP COLUMN "imageUrl",
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "language" TEXT NOT NULL,
ADD COLUMN     "photo" TEXT NOT NULL;
