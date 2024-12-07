-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "rol" TEXT NOT NULL DEFAULT 'user'
);

-- CreateTable
CREATE TABLE "Placas" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
    "Sede" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Propietarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "id_placa" TEXT NOT NULL,
    CONSTRAINT "Propietarios_id_placa_fkey" FOREIGN KEY ("id_placa") REFERENCES "Placas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SearchHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_placa" TEXT NOT NULL,
    "fecha_busqueda" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipo" TEXT NOT NULL,
    CONSTRAINT "SearchHistory_id_placa_fkey" FOREIGN KEY ("id_placa") REFERENCES "Placas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
