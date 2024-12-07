import { Router } from "express";
import db from "../config/db.js";

const route = Router();

route.get("/placa-entrada/:placa", async (req, res) => {
  try {
    const { placa } = req.params;
    console.log(placa);

    const placaFound = await db.placas.findFirst({
      where: {
        N_Placa: placa,
      },
      include: {
        Propietarios: true,
      },
    });

    if (!placaFound) {
      return res.status(400).json({ message: "Placa no encontrada" });
    }

    await db.searchHistory.create({
      data: {
        id_placa: placaFound.id,
        tipo: "entrada",
      },
    });

    res.status(200).json(placaFound);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Eror al buscar la placa" });
  }
});

route.get("/placa-salida/:placa", async (req, res) => {
  try {
    const { placa } = req.params;
    console.log(placa);

    const placaFound = await db.placas.findFirst({
      where: {
        N_Placa: placa,
      },
      include: {
        Propietarios: true,
      },
    });

    if (!placaFound) {
      return res.status(400).json({ message: "Placa no encontrada" });
    }

    await db.searchHistory.create({
      data: {
        id_placa: placaFound.id,
        tipo: "salida",
      },
    });

    res.status(200).json(placaFound);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Eror al buscar la placa" });
  }
});

route.get("/search-history/entrada/:fecha", async (req, res) => {
  try {
    const { fecha } = req.params;

    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(fecha);
    if (!isValidDate) {
      return res
        .status(400)
        .json({ message: "Formato de fecha inválido. Use YYYY-MM-DD." });
    }

    const startOfDay = new Date(`${fecha}T00:00:00Z`);
    const endOfDay = new Date(`${fecha}T23:59:59Z`);

    const results = await db.searchHistory.findMany({
      where: {
        fecha_busqueda: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: {
        placa: true,
      },
    });

    res.json(results);
  } catch (error) {
    console.error("Error al buscar el historial:", error);
    res
      .status(500)
      .json({ message: "Error al buscar el historial", error: error.message });
  }
});

export default route;
