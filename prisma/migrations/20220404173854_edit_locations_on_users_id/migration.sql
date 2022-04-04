/*
  Warnings:

  - The primary key for the `locationsOnUsers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `locationsOnUsers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "locationsOnUsers" DROP CONSTRAINT "locationsOnUsers_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "locationsOnUsers_pkey" PRIMARY KEY ("locationId", "userId");
