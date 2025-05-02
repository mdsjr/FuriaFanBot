require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');
const app = express();

// Configuração de variáveis de ambiente
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

// Verificar se API_KEY está configurada
if (!API_KEY) {
    console.error('Erro: API_KEY não configurada no .env ou variáveis de ambiente.');
    process.exit(1);
}

// Inicializar OpenAI com timeout de 10 segundos
const openai = new OpenAI({
    apiKey: API_KEY,
    timeout: 10000 // 10 segundos
});

// Middleware
app.use(cors()); // Permitir requisições cross-origin
app.use(express.json()); // Parsear JSON no body
app.use(express.static('public')); // Servir arquivos estáticos (index.html, css, etc.)

// Endpoint POST /api/chat - Processa mensagens do chat
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    // Validar entrada
    if (!message || typeof message !== 'string' || message.trim() === '') {
        console.warn('Requisição inválida: message ausente ou inválido', { body: req.body });
        return res.status(400).json({ reply: 'Fala, fã! Envie uma mensagem válida! 🖤🧡' });
    }

    try {
        // Prompt para o FURIA FanBot
        const prompt = `
Você é o FURIA FanBot, um assistente conversacional para fãs do time de Counter-Strike da FURIA. Responda com entusiasmo, usando a linguagem dos fãs (ex.: "VAMOS, FURIA!", "#DIADEFURIA"). Suporte comandos específicos e perguntas genéricas. Comandos disponíveis:
- /proximojogo: Informe o próximo jogo (ex.: "FURIA vs MIBR, 30/04/2025 às 15h").
- /noticias: Liste notícias recentes (ex.: "YEKINDAR é o novo stand-in!").
- /torcida: Gere um grito de torcida (ex.: "VAMOS, FURIA! 🖤🧡").
- /suporte: Responda sobre loja, ingressos, etc. (ex.: "Camisas em loja.furia.gg").
Para mensagens genéricas, responda com paixão e contexto da FURIA. Exemplo: "FURIA é foda!" → "Aí sim, fã raiz! 💪 #FURIACS". Mantenha respostas curtas e no tom da torcida.
Mensagem do usuário: "${message.trim()}"
`;

        // Chamar OpenAI API
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: prompt },
                { role: 'user', content: message.trim() }
            ],
            max_tokens: 150,
            temperature: 0.7
        });

        // Extrair resposta
        const reply = completion.choices[0].message.content.trim();
        res.json({ reply });
    } catch (error) {
        console.error('Erro ao chamar OpenAI:', {
            message: error.message,
            status: error.response?.status,
            details: error.response?.data
        });
        res.status(500).json({ reply: 'Ops, deu um bug no clutch! Tente novamente, fã! 🖤🧡' });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});