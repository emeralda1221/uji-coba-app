# Tanya AI - App Sederhana

App tanya-jawab pakai Claude API. Ada 2 bagian:
- `index.html` → tampilan chat (frontend)
- `server.js` → backend yang manggil Claude API (biar API key aman)

## Cara jalanin di komputer

1. Pastikan sudah install [Node.js](https://nodejs.org)
2. Buka folder ini di terminal, lalu install dependency:
   ```
   npm install
   ```
3. Dapatkan API key dari [console.anthropic.com](https://console.anthropic.com), lalu set sebagai environment variable:
   ```
   # Mac/Linux
   export ANTHROPIC_API_KEY=your_key_disini

   # Windows (PowerShell)
   $env:ANTHROPIC_API_KEY="your_key_disini"
   ```
4. Jalankan server:
   ```
   npm start
   ```
5. Buka browser ke `http://localhost:3000/index.html`
6. Coba ketik pertanyaan dan tekan Kirim 🎉

## Langkah lanjut: jadi app mobile

Setelah versi web-nya jalan lancar, kamu bisa bungkus jadi app Android/iOS pakai **Capacitor**:

1. Deploy backend (`server.js`) ke hosting (misal Render, Railway, atau Vercel) supaya bisa diakses dari internet, bukan cuma localhost.
2. Update `BACKEND_URL` di `index.html` ke alamat hosting itu.
3. Di folder project, jalankan:
   ```
   npm install @capacitor/core @capacitor/cli
   npx cap init
   npx cap add android
   npx cap add ios
   npx cap sync
   ```
4. Buka project Android di Android Studio (`npx cap open android`) atau iOS di Xcode (`npx cap open ios`), lalu jalankan di emulator/HP.

## Catatan penting

- **Jangan** taruh API key langsung di `index.html` atau kode yang dikirim ke user — selalu lewat backend seperti `server.js`.
- Kalau mau ganti model AI, tinggal ubah nilai `model` di `server.js`.
