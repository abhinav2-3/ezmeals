-- CreateEnum
CREATE TYPE "Meal_Type" AS ENUM ('drink', 'meal');

-- CreateEnum
CREATE TYPE "Meal_Size" AS ENUM ('small', 'medium', 'large');

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "type" "Meal_Type" NOT NULL,
    "size" "Meal_Size" NOT NULL,
    "quantitiy" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);
