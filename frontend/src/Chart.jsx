import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LatestSensorData = () => {
  const [sensorData, setSensorData] = useState([]);
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

        // Tambahkan data baru ke sensorData
        setSensorData((prevData) => [
          ...prevData,
          {
            time: new Date().toLocaleTimeString(),
            temperature: data.temperature,
            humidity: data.humidity,
          },
        ]);
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

  if (!sensorData.length) {
    return <div className="text-center p-4">Tidak ada data sensor</div>;
  }

  return (
    <div className="p-3 lg:p-8 border rounded-lg shadow-sm">
      <div>
        <h1 className="text-xl font-semibold mb-4">Data Sensor DHT11</h1>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Suhu:</span>
            <span className="font-medium">
              {sensorData[sensorData.length - 1].temperature}°C
            </span>
          </div>
          <div className="flex justify-between">
            <span>Kelembaban:</span>
            <span className="font-medium">
              {sensorData[sensorData.length - 1].humidity}%
            </span>
          </div>

          <div className="text-sm text-gray-500 pt-2">
            Update terakhir : {new Date().toLocaleTimeString()}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live Update</span>
          </div>
        </div>
      </div>

      <div className="grid grid-row-2">
        {/* Grafik Suhu */}
        <div className="mt-4" style={{ width: "100%", height: 300 }}>
          <h2 className="text-lg font-semibold mb-4">Grafik Suhu</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sensorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis
                domain={["auto", "auto"]} // Menyesuaikan rentang sumbu Y secara otomatis
                tickFormatter={(value) => `${value}°C`} // Menambahkan format °C pada ticks
                label={{
                  angle: -90,
                  position: "insideLeft",
                }} // Label Y Axis
              />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Grafik Kelembaban */}
        <div className="mt-10" style={{ width: "100%", height: 300 }}>
          <h2 className="text-lg font-semibold mb-4">Grafik Kelembaban</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sensorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis
                domain={["auto", "auto"]} // Menyesuaikan rentang sumbu Y secara otomatis
                tickFormatter={(value) => `${value}`} // Menambahkan format °C pada ticks
                label={{
                  angle: -90,
                  position: "insideLeft",
                }} // Label Y Axis
              />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default LatestSensorData;

