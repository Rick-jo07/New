-- CreateTable
CREATE TABLE "Todo" (
    "userid" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdate" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "todo_id" SERIAL NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("todo_id")
);

-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userid" SERIAL NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
