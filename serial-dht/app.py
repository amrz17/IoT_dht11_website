import re
import serial
import requests

arduino_port = "/dev/ttyACM0"  # Sesuaikan port Arduino
baud_rate = 9600

arduino = serial.Serial(arduino_port, baud_rate)

# Konfigurasi API
api_url = "http://127.0.0.1:3000/data-sensor"  # URL API lokal


def parse_sensor_data(data):
    humidity_match = re.search(r"Humidity:\s*([\d.]+)", data)
    temperature_match = re.search(r"Temperature:\s*([\d.]+)", data)

    if humidity_match and temperature_match:
        humidity = float(humidity_match.group(1))
        temperature = float(temperature_match.group(1))
        # Mengembalikan hasil dalam bentuk dictionary
        return {"temperature": temperature, "humidity": humidity}
    else:
        return None


try:
    while True:
        if arduino.in_waiting > 0:
            # Membaca data dari Arduino
            data = arduino.readline().decode("utf-8").strip()
            # print(f"Data diterima: {data}")

            # Parsing data menggunakan fungsi
            result = parse_sensor_data(data)

            # parsed_data = {
            #    "temperature": temperature,
            #    "humidity": humidity
            # }

            # Kirim data ke API
            response = requests.post(api_url, json=result)
            print(f"Response API: {response.status_code}, {response.text}")


except KeyboardInterrupt:
    print("Program dihentikan.")
finally:
    arduino.close()
