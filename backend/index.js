import express from "express";
import { PrismaClient } from "@prisma/client";
import jakartaTime from "./datetime.js";

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome Myy Boyy");
});

// Endpoint untuk menambahkan pengguna
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

app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});
