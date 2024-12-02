/* Solo ejecutar una vez ok! */

import { PrismaClient } from "@prisma/client";
import fs from "node:fs";

const prisma = new PrismaClient();

async function main() {
  const rawData = fs.readFileSync("data.json", "utf-8");
  const data = JSON.parse(rawData);

  for (const record of data) {
    const { Propietarios, ...placaData } = record;

    const placa = await prisma.placas.create({
      data: {
        ...placaData,
        Propietarios: {
          create: {
            nombre: Propietarios.nombre,
            apellido: Propietarios.apellido,
          },
        },
      },
    });

    console.log(`Placa creada con ID: ${placa.id}`);
  }
}

main()
  .then(() => {
    console.log("Datos insertados exitosamente.");
    prisma.$disconnect();
  })
  .catch((error) => {
    console.error("Error al insertar datos:", error);
    prisma.$disconnect();
    process.exit(1);
  });
