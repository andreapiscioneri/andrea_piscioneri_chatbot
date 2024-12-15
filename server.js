const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();  // Carica la API Key da un file .env

const app = express();
const port = 3000;

// Middleware per il parsing dei JSON
app.use(express.json());

// Endpoint per inviare le richieste a GPT-3
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: "gpt-3.5-turbo",  // Puoi usare anche GPT-4 se disponibile
      messages: [
        { role: "system", content: "Sei un assistente di e-commerce. Rispondi in modo educato e utile." },
        { role: "user", content: userMessage },
      ],
      max_tokens: 150,
      temperature: 0.7,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // API Key in variabili d'ambiente
      }
    });

    const botMessage = response.data.choices[0].message.content;
    res.json({ message: botMessage });
  } catch (error) {
    console.error(error);
    res.status(500).send('Errore durante la comunicazione con l\'API');
  }
});

app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});
