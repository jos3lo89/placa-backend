-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('admin', 'user');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "rol" "Roles" NOT NULL DEFAULT 'user',

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Placas" (
    "id" TEXT NOT NULL,
    "N_Placa" TEXT NOT NULL,
    "N_Serie" TEXT NOT NULL,
    "N_VIN" TEXT NOT NULL,
    "N_Motor" TEXT NOT NULL,
    "Color" TEXT NOT NULL,
    "Marca" TEXT NOT NULL,
    "Modelo" TEXT NOT NULL,
    "Placa_Vigente" TEXT NOT NULL,
    "Placa_Anterior" TEXT NOT NULL,
    "Estado" TEXT NOT NULL,
    "Anotaciones" TEXT NOT NULL,
    "Sede" TEXT NOT NULL,

    CONSTRAINT "Placas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Propietarios" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "id_placa" TEXT NOT NULL,

    CONSTRAINT "Propietarios_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Propietarios" ADD CONSTRAINT "Propietarios_id_placa_fkey" FOREIGN KEY ("id_placa") REFERENCES "Placas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
