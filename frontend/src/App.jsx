import { useState, useEffect } from "react";

const LatestSensorData = () => {
  const [sensorData, setSensorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/data-sensor/latest",
          {
            headers: {
              "Cache-Control": "no-cache",
            },
          },
        );
        const data = await response.json();
        console.log("Fetched Data:", data); // Log data setiap kali di-fetch
        setSensorData(data); // Update state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching latest sensor data:", error);
        setLoading(false);
      }
    };

    fetchData(); // Fetch awal
    const intervalId = setInterval(fetchData, 2000); // Fetch setiap 2 detik

    return () => clearInterval(intervalId); // Cleanup interval saat komponen unmount
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (!sensorData) {
    return <div className="text-center p-4">Tidak ada data sensor</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-sm">
      <h1 className="text-xl font-semibold mb-4">Data Sensor DHT11</h1>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Suhu:</span>
          <span className="font-medium">{sensorData.temperature}°C</span>
        </div>

        <div className="flex justify-between">
          <span>Kelembaban:</span>
          <span className="font-medium">{sensorData.humidity}%</span>
        </div>

        <div className="text-sm text-gray-500 pt-2">
          Update terakhir: {new Date(sensorData.createdAt).toLocaleString()}
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live Update</span>
        </div>
      </div>
    </div>
  );
};

export default LatestSensorData;
