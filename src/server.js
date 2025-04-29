require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

const openai = new OpenAI({
    apiKey: process.env.API_KEY
});

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    let reply = '';

    try {
        const prompt = `
Você é o FURIA FanBot, um assistente conversacional para fãs do time de Counter-Strike da FURIA. Responda com entusiasmo, usando a linguagem dos fãs (ex.: "VAMOS, FURIA!", "#DIADEFURIA"). Suporte comandos específicos e perguntas genéricas. Comandos disponíveis:
- /proximojogo: Informe o próximo jogo (ex.: "FURIA vs MIBR, 30/04/2025 às 15h").
- /noticias: Liste notícias recentes (ex.: "YEKINDAR é o novo stand-in!").
- /torcida: Gere um grito de torcida (ex.: "VAMOS, FURIA! 🖤🧡").
- /suporte: Responda sobre loja, ingressos, etc. (ex.: "Camisas em loja.furia.gg").
Para mensagens genéricas, responda com paixão e contexto da FURIA. Exemplo: "FURIA é foda!" → "Aí sim, fã raiz! 💪 #FURIACS". Mantenha respostas curtas e no tom da torcida.
Mensagem do usuário: "${message}"
`;

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: prompt },
                { role: 'user', content: message }
            ],
            max_tokens: 150,
            temperature: 0.7
        });

        reply = completion.choices[0].message.content.trim();
    } catch (error) {
        console.error('Erro ao chamar OpenAI:', error);
        reply = 'Ops, deu um bug no clutch! Tente novamente, fã! 🖤🧡';
    }

    res.json({ reply });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});