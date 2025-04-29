FURIA FanBot
FURIA FanBot é um web chat conversacional desenvolvido para o Challenge #1 da FURIA, permitindo que fãs do time de Counter-Strike interajam com um bot alimentado pela API da OpenAI. O bot responde a perguntas sobre jogos, notícias, torcida, e suporte, com o tom entusiasmado da #FURIACS.
Funcionalidades

Chat Conversacional:
Respostas naturais usando o modelo gpt-4o-mini da OpenAI.
Suporte a comandos:
/proximojogo: Informa o próximo jogo (mockado).
/noticias: Lista notícias recentes.
/torcida: Gera gritos de torcida (ex.: "VAMOS, FURIA!").
/suporte: Responde sobre loja, ingressos, etc.

Respostas genéricas com tom de fã (ex.: "FURIA é foda!" → "Aí sim, fã raiz! 💪").

Interface:
Design nas cores da FURIA (preto e laranja).
Histórico de mensagens e input de texto.

Tecnologias Utilizadas

Frontend: HTML, JavaScript, Tailwind CSS (via CDN).
Backend: Node.js, Express, OpenAI API.
Segurança: Chave da API em variável de ambiente (API_KEY).
Outros: Git, Postman (para testes).

Pré-requisitos

Node.js (v18 ou superior).
Conta na OpenAI com chave API.
Navegador moderno (Chrome, Firefox, Edge).

Configuração

Clone o Repositório:git clone https://github.com/<seu-usuario>/FuriaFanBot.git
cd FuriaFanBot

Instale Dependências:npm install

Configure a Chave da OpenAI:
Defina a variável de ambiente API_KEY:$env:API_KEY = "sua-chave-da-openai"

Ou crie um arquivo .env com base em .env.example:API_KEY=sua-chave-da-openai

Execute a Aplicação:npm start

Acesse:
Abra http://localhost:3000.

Testes

Comandos: /proximojogo, /noticias, /torcida, /suporte.
Mensagens Genéricas: "FURIA é foda!", "Quem joga amanhã?".
Logs: Verifique console do navegador (F12) e terminal.

Limitações

Dados Mockados: Jogos e notícias são simulados (sem integração com API externa).
Custo da API: Uso da OpenAI depende dos créditos disponíveis.
Frontend: Tailwind CSS via CDN, não otimizado para produção.

Estrutura do Projeto  
FuriaFanBot/  
├── public/  
│ ├── index.html  
├── src/  
│ ├── server.js  
├── .env.example  
├── .gitignore  
├── package.json  
├── README.md

Vídeo de Apresentação
Um vídeo de 3 minutos será criado para demonstrar:

Introdução: Apresentação do FURIA FanBot.
Demonstração: Interação com comandos e mensagens genéricas.
Conclusão: Benefícios e tecnologias.

Contato
Dúvidas? Contate Moacir Domingos (moacir@example.com).

Desenvolvido com 💪 para a FURIA! #DIADEFURIA
