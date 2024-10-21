/*
  Warnings:

  - You are about to drop the column `price` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[shopId]` on the table `Item` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shopId` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shopId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "shopId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "price",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "shopId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Item_shopId_key" ON "Item"("shopId");
