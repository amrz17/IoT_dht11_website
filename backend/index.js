import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import jakartaTime from "./datetime.js";

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome Myy Boyy");
});

// Endpoint POST untuk menyimpan data sensor
app.post("/data-sensor", async (req, res) => {
  const { temperature, humidity, createdAt = jakartaTime } = req.body;
  try {
    const datas = await prisma.tbl_data_sensor.create({
      data: { temperature, humidity, createdAt },
    });
    console.log(
      `Temperature : ${temperature} \nHumidity : ${humidity}\n--------------------`,
    );
    res.json(datas);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint GET untuk mengambil data sensor terbaru
app.get("/data-sensor/latest", async (req, res) => {
  res.set("Cache-Control", "no-store"); // Mencegah caching
  try {
    const latestData = await prisma.tbl_data_sensor.findFirst({
      orderBy: {
        id_data: "desc", // Mengambil data paling baru berdasarkan timestamp
      },
    });

    if (!latestData) {
      return res.status(404).json({ error: "No sensor data found" });
    }

    res.json(latestData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch sensor data" });
  }
});

app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});
