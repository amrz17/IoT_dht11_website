import { useState, useEffect } from "react";

const SensorDashboard = () => {
  const [sensorData, setSensorData] = useState({
    temperature: null,
    humidity: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fungsi untuk mengambil data dari backend
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/data-sensor"); // Ganti dengan URL API Anda
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        setSensorData(data); // Set data ke state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Dependency array kosong untuk menjalankan efek ini sekali saja

  if (loading) {
    return <div>Loading...</div>; // Menampilkan loading saat data belum diambil
  }

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        marginTop: "20px",
      }}
    >
      <h1>Sensor Dashboard</h1>
      <p>
        <strong>Temperature:</strong> {sensorData.temperature}°C
      </p>
      <p>
        <strong>Humidity:</strong> {sensorData.humidity}%
      </p>
    </div>
  );
};

export default SensorDashboard;
