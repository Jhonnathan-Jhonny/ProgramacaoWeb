const axios = require('axios');
const readline = require('readline');

// Configuração para entrada de dados no terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Mapeamento de UF para nome completo e região
const estadosRegioes = {
  'AC': { nome: 'Acre', regiao: 'Norte', ddd: [68] },
  'AL': { nome: 'Alagoas', regiao: 'Nordeste', ddd: [82] },
  'AP': { nome: 'Amapá', regiao: 'Norte', ddd: [96] },
  'AM': { nome: 'Amazonas', regiao: 'Norte', ddd: [92, 97] },
  'BA': { nome: 'Bahia', regiao: 'Nordeste', ddd: [71, 73, 74, 75, 77] },
  'CE': { nome: 'Ceará', regiao: 'Nordeste', ddd: [85, 88] },
  'DF': { nome: 'Distrito Federal', regiao: 'Centro-Oeste', ddd: [61] },
  'ES': { nome: 'Espírito Santo', regiao: 'Sudeste', ddd: [27, 28] },
  'GO': { nome: 'Goiás', regiao: 'Centro-Oeste', ddd: [62, 64] },
  'MA': { nome: 'Maranhão', regiao: 'Nordeste', ddd: [98, 99] },
  'MT': { nome: 'Mato Grosso', regiao: 'Centro-Oeste', ddd: [65, 66] },
  'MS': { nome: 'Mato Grosso do Sul', regiao: 'Centro-Oeste', ddd: [67] },
  'MG': { nome: 'Minas Gerais', regiao: 'Sudeste', ddd: [31, 32, 33, 34, 35, 37, 38] },
  'PA': { nome: 'Pará', regiao: 'Norte', ddd: [91, 93, 94] },
  'PB': { nome: 'Paraíba', regiao: 'Nordeste', ddd: [83] },
  'PR': { nome: 'Paraná', regiao: 'Sul', ddd: [41, 42, 43, 44, 45, 46] },
  'PE': { nome: 'Pernambuco', regiao: 'Nordeste', ddd: [81, 87] },
  'PI': { nome: 'Piauí', regiao: 'Nordeste', ddd: [86, 89] },
  'RJ': { nome: 'Rio de Janeiro', regiao: 'Sudeste', ddd: [21, 22, 24] },
  'RN': { nome: 'Rio Grande do Norte', regiao: 'Nordeste', ddd: [84] },
  'RS': { nome: 'Rio Grande do Sul', regiao: 'Sul', ddd: [51, 53, 54, 55] },
  'RO': { nome: 'Rondônia', regiao: 'Norte', ddd: [69] },
  'RR': { nome: 'Roraima', regiao: 'Norte', ddd: [95] },
  'SC': { nome: 'Santa Catarina', regiao: 'Sul', ddd: [47, 48, 49] },
  'SP': { nome: 'São Paulo', regiao: 'Sudeste', ddd: [11, 12, 13, 14, 15, 16, 17, 18, 19] },
  'SE': { nome: 'Sergipe', regiao: 'Nordeste', ddd: [79] },
  'TO': { nome: 'Tocantins', regiao: 'Norte', ddd: [63] }
};

// Função para validar o formato do CEP
function validarCEP(cep) {
  const cepLimpo = cep.replace(/\D/g, '');
  return /^\d{8}$/.test(cepLimpo);
}

// Função para formatar o CEP (adiciona o hífen)
function formatarCEP(cep) {
  const cepLimpo = cep.replace(/\D/g, '');
  return cepLimpo.replace(/(\d{5})(\d{3})/, '$1-$2');
}

// Função principal que consulta a API ViaCEP
async function consultarCEP() {
  rl.question('Digite o CEP (apenas números): ', async (cepInput) => {
    try {
      // Validação
      if (!validarCEP(cepInput)) {
        console.log('\n❌ CEP inválido! Deve conter 8 dígitos.\n');
        rl.close();
        return;
      }

      // Consulta a API
      const cepFormatado = cepInput.replace(/\D/g, '');
      const response = await axios.get(`https://viacep.com.br/ws/${cepFormatado}/json/`);

      // Verifica se o CEP existe
      if (response.data.erro) {
        throw new Error('CEP não encontrado');
      }

      // Processa os dados
      const dados = response.data;
      const ufInfo = estadosRegioes[dados.uf] || { nome: 'Desconhecido', regiao: 'Desconhecida', ddd: [] };

      // Exibe os resultados formatados
      console.log('\n✅ CEP ENCONTRADO\n');
      console.log(`📍 ${dados.logradouro || 'Rua não informada'}`);
      console.log(`🏘️ ${dados.bairro || 'Bairro não informado'}`);
      console.log(`🏙️ ${dados.localidade}/${dados.uf}`);
      console.log(`🌎 Região: ${ufInfo.regiao}`);
      console.log(`📞 DDD: ${dados.ddd || ufInfo.ddd.join(' ou ')}`);
      console.log(`📮 CEP: ${formatarCEP(dados.cep)}`);

    } catch (error) {
      console.error('\n❌ Erro:', error.message);
    } finally {
      rl.close();
    }
  });
}

// Mensagem inicial
console.log('==================================');
console.log('   CONSULTA DE CEP - VIA TERMINAL');
console.log('==================================\n');

// Inicia a aplicação
consultarCEP();