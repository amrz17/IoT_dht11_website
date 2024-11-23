import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, Tooltip, CartesianGrid } from "recharts";
import axios from "axios";

const RealTimeChart = () => {
  const [data, setData] = useState([
    { name: "T1", uv: 4000, pv: 2400 },
    { name: "T2", uv: 3000, pv: 1398 },
    { name: "T3", uv: 2000, pv: 9800 },
    { name: "T4", uv: 1000, pv: 2400 },
    { name: "T5", uv: 3000, pv: 1398 },
    { name: "T6", uv: 2000, pv: 9800 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        // Geser data ke belakang
        const shiftedData = prevData.map((item, index) => {
          // Update nilai berdasarkan posisi
          if (index === prevData.length - 1) {
            // Elemen terakhir dihapus atau diberi nilai default
            return { ...item, uv: 0, pv: 0 };
          }
          return { ...prevData[index + 1] }; // Geser elemen berikutnya
        });

        // Masukkan data baru ke elemen pertama
        shiftedData[0] = {
          name: `T${Math.floor(Math.random() * 100)}`,
          uv: Math.floor(Math.random() * 1000),
          pv: Math.floor(Math.random() * 1000),
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
        <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
        <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
      </LineChart>
    </div>
  );
};

export default RealTimeChart;
