-- CreateTable
CREATE TABLE "tbl_data_sensor" (
    "id_data" SERIAL NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "humidity" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_data_sensor_pkey" PRIMARY KEY ("id_data")
);
