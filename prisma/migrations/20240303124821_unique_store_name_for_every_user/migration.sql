/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `Store` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Store_name_userId_key" ON "Store"("name", "userId");
