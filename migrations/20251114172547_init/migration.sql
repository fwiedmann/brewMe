/*
  Warnings:

  - Added the required column `proportion` to the `Phase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `step` to the `Phase` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PhaseStep" AS ENUM ('BLOOMING', 'POUR_OVER');

-- AlterTable
ALTER TABLE "Phase" ADD COLUMN     "proportion" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "step" "PhaseStep" NOT NULL;
