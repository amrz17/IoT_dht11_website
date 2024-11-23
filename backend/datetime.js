import { DateTime } from 'luxon';

// Menampilkan waktu di zona tertentu
const jakartaTime = DateTime.now().setZone('Asia/Jakarta').toISO();
console.log(`Waktu di Jakarta: ${jakartaTime}`);


export default jakartaTime;