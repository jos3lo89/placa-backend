-- CreateTable
CREATE TABLE "SearchHistory" (
    "id" TEXT NOT NULL,
    "id_placa" TEXT NOT NULL,
    "fecha_busqueda" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SearchHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SearchHistory" ADD CONSTRAINT "SearchHistory_id_placa_fkey" FOREIGN KEY ("id_placa") REFERENCES "Placas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
