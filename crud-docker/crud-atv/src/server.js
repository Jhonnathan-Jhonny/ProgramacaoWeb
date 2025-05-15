require('dotenv').config();
const path = require('path');
const fs = require('fs');
const express = require('express');
const carRoutes = require('./routes/carRoutes');
const sequelize = require('./config/database');

const app = express();
const port = process.env.PORT || 3000;

// Middleware de arquivos estáticos CORRIGIDO
app.use(express.static(path.join(__dirname, '..', 'public')));

// Middleware personalizado para logging de arquivos estáticos
app.use((req, res, next) => {
  if (req.url.includes('.')) { // Verifica se é um arquivo (tem extensão)
    const filePath = path.join(__dirname, '..', 'public', req.url);
    console.log(`[Static] Tentando servir: ${filePath}`);
    
    if (fs.existsSync(filePath)) {
      console.log(`[Static] Arquivo encontrado: ${req.url}`);
    } else {
      console.warn(`[Static] Arquivo não encontrado: ${req.url}`);
    }
  }
  next();
});

// Restante do seu código...
app.use(express.json());
app.use(carRoutes);

// Rota principal com verificação reforçada
app.get('/', (req, res) => {
  const filePath = path.join(__dirname, '..', 'public', 'index.html');
  console.log(`[ROOT] Tentando enviar: ${filePath}`);
  
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    const errorMsg = `Arquivo index.html não encontrado em: ${filePath}`;
    console.error(errorMsg);
    res.status(500).send(errorMsg);
  }
});

// Rota de teste para verificação
app.get('/api/check', (req, res) => {
  const publicPath = path.join(__dirname, '..', 'public');
  res.json({
    status: 'API funcionando',
    publicPath: publicPath,
    files: fs.readdirSync(publicPath),
    absolutePath: path.resolve(publicPath)
  });
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro:', err.stack);
  res.status(500).send('Algo quebrou!');
});

// Sincronização do banco e inicialização do servidor
sequelize.sync()
  .then(() => {
    app.listen(port, '0.0.0.0', () => {  // Adicionado '0.0.0.0' para aceitar conexões externas
      console.log(`\n=== Servidor rodando ===`);
      console.log(`Local: http://localhost:${port}`);
      console.log(`Network: http://${getIpAddress()}:${port}`);
      console.log('Banco de dados sincronizado\n');
      
      // Verificação automática dos arquivos
      const publicDir = path.join(__dirname, '..', 'public');
      console.log('Conteúdo da pasta public:');
      console.log(fs.readdirSync(publicDir));
    });
  })
  .catch(err => {
    console.error('Erro ao sincronizar banco de dados:', err);
  });

// Função para obter endereço IP local
function getIpAddress() {
  const interfaces = require('os').networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}