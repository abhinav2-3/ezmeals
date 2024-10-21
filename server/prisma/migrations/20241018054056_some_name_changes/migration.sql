/*
  Warnings:

  - You are about to drop the column `image_url` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `quantitiy` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `quantitiy` on the `Order` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "image_url",
DROP COLUMN "quantitiy",
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "quantitiy",
ADD COLUMN     "quantity" INTEGER NOT NULL;
