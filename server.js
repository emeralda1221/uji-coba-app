// server.js
// Backend kecil buat terima pertanyaan dari app, teruskan ke Claude API,
// lalu kirim balik jawabannya. API key disimpan aman di sini, bukan di app.

const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // biar index.html juga bisa dibuka lewat server ini

// Ambil API key dari environment variable (JANGAN taruh key langsung di kode)
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `Kamu adalah asisten yang ahli di bidang ilmu kebumian: geologi, geodesi, geografi, dan sains kebumian secara umum (meteorologi, oseanografi, geofisika, dll).
Jawab pertanyaan dengan jelas, akurat, dan mudah dipahami, boleh pakai istilah teknis tapi jelaskan artinya.
Kalau user nanya hal di luar topik ilmu kebumian, jawab dengan sopan bahwa kamu difokuskan untuk bahas ilmu kebumian, dan tawarkan buat bantu topik itu saja.`;

app.post('/api/chat', async (req, res) => {
  const question = req.body.question;

  if (!question) {
    return res.status(400).json({ error: 'Pertanyaan kosong' });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: question,
      config: { systemInstruction: SYSTEM_PROMPT }
    });

    res.json({ answer: response.text || 'Tidak ada jawaban.' });
  } catch (err) {
    console.error('Gemini API error:', err.message);
    res.status(500).json({ answer: 'Error dari Gemini: ' + err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});