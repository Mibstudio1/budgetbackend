-- CreateEnum
CREATE TYPE "public"."Project_Group" AS ENUM ('software_dev', 'outsource_service', 'other');

-- CreateEnum
CREATE TYPE "public"."Project_Status" AS ENUM ('in_progress', 'completed', 'cancel');

-- CreateEnum
CREATE TYPE "public"."Expense_Items" AS ENUM ('outsource', 'server', 'subscription', 'internet', 'food', 'sales_incentive');

-- CreateTable
CREATE TABLE "public"."BG_Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "startDate" TEXT,
    "endDate" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "BG_Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BG_Sales_Entry" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT,
    "totalPrice" DECIMAL(65,30) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bGProjectId" TEXT,

    CONSTRAINT "BG_Sales_Entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BG_Expense_Entries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cost" DECIMAL(65,30) NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "createdBy" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "bGProjectId" TEXT,

    CONSTRAINT "BG_Expense_Entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BG_Revenue_Targets" (
    "id" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "target" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "BG_Revenue_Targets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BG_User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "BG_User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BG_Budget" (
    "id" TEXT NOT NULL,
    "bGProjectId" TEXT,
    "description" TEXT NOT NULL,
    "budget" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "BG_Budget_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BG_User_username_key" ON "public"."BG_User"("username");

-- AddForeignKey
ALTER TABLE "public"."BG_Sales_Entry" ADD CONSTRAINT "BG_Sales_Entry_bGProjectId_fkey" FOREIGN KEY ("bGProjectId") REFERENCES "public"."BG_Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BG_Expense_Entries" ADD CONSTRAINT "BG_Expense_Entries_bGProjectId_fkey" FOREIGN KEY ("bGProjectId") REFERENCES "public"."BG_Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BG_Budget" ADD CONSTRAINT "BG_Budget_bGProjectId_fkey" FOREIGN KEY ("bGProjectId") REFERENCES "public"."BG_Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
