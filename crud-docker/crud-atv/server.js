require('dotenv').config();
const express = require('express');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(userRoutes);

app.get('/', (req, res) => {
    res.send('Backend Node.js funcionando!');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
