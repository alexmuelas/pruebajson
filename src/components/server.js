const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();

app.use(express.json());

const filePath = path.join(__dirname, 'prueba.json');

app.get('/datos', async (req, res) => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error("filePath: " + filePath);
    console.error('Error al leer el archivo JSONN', error);
    res.status(500).send('Error al leer el archivo JSON');
  }
});

app.post('/datos', async (req, res) => {
  try {
    const newData = req.body;

    // Lee el archivo JSON actual
    const currentData = JSON.parse(await fs.readFile(filePath, 'utf-8'));

    // Combina los datos existentes con los nuevos datos
    const updatedData = { ...currentData, ...newData };

    // Escribe los datos actualizados en el archivo JSON
    await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2));

    res.json(updatedData);
  } catch (error) {
    console.error('Error al escribir en el archivo JSON', error);
    res.status(500).send('Error al escribir en el archivo JSON');
  }
});
