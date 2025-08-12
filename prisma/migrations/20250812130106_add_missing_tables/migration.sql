-- AlterTable
ALTER TABLE "public"."BG_Expense_Entries" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."BG_Sales_Entry" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "public"."BG_Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "usageCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "BG_Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BG_Expense_Item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "usageCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "BG_Expense_Item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BG_Category_name_key" ON "public"."BG_Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BG_Expense_Item_name_key" ON "public"."BG_Expense_Item"("name");
