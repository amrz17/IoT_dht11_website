import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, Tooltip, CartesianGrid } from "recharts";

const RealTimeChart = () => {
  const [data, setData] = useState([
    { name: "T1", temperature: 31, humidity: 20 },
    { name: "T1", temperature: 32, humidity: 30 },
    { name: "T1", temperature: 38, humidity: 28 },
    { name: "T1", temperature: 31, humidity: 20 },
    { name: "T1", temperature: 34, humidity: 25 },

  ]);
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        // Geser data ke belakang
        const shiftedData = prevData.map((item, index) => {
          // Update nilai berdasarkan posisi
          if (index === prevData.length - 1) {
            return {
              ...item,
              temperature: Math.floor(Math.random() * 10) + 20, // Suhu acak antara 20-29
              humidity: Math.floor(Math.random() * 30) + 20,    // Kelembapan acak antara 20-49
            };
          }
          return { ...prevData[index + 1] }; // Geser elemen berikutnya
        });
        // Masukkan data baru ke elemen pertama
        shiftedData[length -1] = {
          name: `T${Math.floor(Math.random())}`,
          temperature: Math.floor(Math.random() * 4),
          humidity: Math.floor(Math.random() * 5),
        };
        return shiftedData;
      });
    }, 2000); // Update setiap 2 detik
    return () => clearInterval(interval); // Cleanup interval saat komponen di-unmount
  }, []);
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1>DATA SUHU RUANGAN</h1>
      <LineChart
        width={860}
        height={460}
        data={data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="temperature" stroke="#ff7300" yAxisId={0} />
        <Line type="monotone" dataKey="humidity" stroke="#387908" yAxisId={1} />
      </LineChart>
    </div>
  );
};
export default RealTimeChart;