/*
  Warnings:

  - Changed the type of `step` on the `Phase` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Phase" DROP COLUMN "step",
ADD COLUMN     "step" TEXT NOT NULL;

-- DropEnum
DROP TYPE "PhaseStep";
