-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "Meal_Type" NOT NULL,
    "size" "Meal_Size" NOT NULL,
    "quantitiy" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "orderedDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
