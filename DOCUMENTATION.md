# Documentação Técnica - FURIA FanBot

**FURIA FanBot** é um web chat conversacional desenvolvido para o **Challenge #1** da FURIA, permitindo que fãs do time de Counter-Strike interajam com um bot alimentado pela API da OpenAI. O bot responde a perguntas sobre jogos, notícias, torcida, e suporte, com o tom entusiasmado da `#FURIACS`. Este documento detalha a arquitetura do projeto, cada arquivo, suas funcionalidades, funções principais, e as tecnologias/ferramentas utilizadas.

## Visão Geral

A aplicação é dividida em dois componentes principais:

- **Backend:** Desenvolvido em Node.js com Express, integra-se com a API da OpenAI para processar mensagens dos usuários e gerar respostas contextuais usando o modelo `gpt-4o-mini`.
- **Frontend:** Implementado com HTML, JavaScript, e Tailwind CSS, exibe uma interface de chat com histórico de mensagens, input de texto, e design nas cores da FURIA (preto, azul escuro, e laranja).

## Funcionalidades

- **Chat Conversacional:**

  - Processa mensagens dos usuários via API da OpenAI, retornando respostas naturais e entusiasmadas.
  - Suporta comandos específicos:
    - `/proximojogo`: Informa o próximo jogo (ex.: "FURIA vs MIBR, 30/04/2025 às 15h").
    - `/noticias`: Lista notícias recentes (ex.: "YEKINDAR é o novo stand-in!").
    - `/torcida`: Gera gritos de torcida (ex.: "VAMOS, FURIA! 🖤🧡").
    - `/suporte`: Responde sobre loja, ingressos, etc. (ex.: "Camisas em loja.furia.gg").
  - Responde a mensagens genéricas com tom de fã (ex.: "FURIA é foda!" → "Aí sim, fã raiz! 💪 #FURIACS").

- **Interface de Usuário:**

  - Exibe o logo da FURIA na página e como favicon.
  - Usa cores da FURIA (preto: `#1a1a1a`, azul escuro: `#003087`, laranja: `#f97316`).
  - Permite envio de mensagens via botão ou tecla Enter.

- **Integração com OpenAI:**
  - Usa a API `chat/completions` com o modelo `gpt-4o-mini` para respostas.
  - Autentica chamadas com a chave `API_KEY` armazenada em variável de ambiente.

## Tecnologias Utilizadas

**Backend:**

- **Node.js (v18):** Ambiente de execução JavaScript para o servidor.
- **Express (4.18.2):** Framework web para criar a API RESTful.
- **OpenAI API (4.0.0):** Integração com o modelo `gpt-4o-mini` para respostas conversacionais.
- **dotenv (16.0.3):** Carrega variáveis de ambiente (ex.: `API_KEY`) do arquivo `.env`.

**Frontend:**

- **HTML5:** Estrutura da página.
- **JavaScript (ES6):** Lógica do cliente, incluindo chamadas Fetch para a API.
- **Tailwind CSS (via CDN):** Estilização responsiva com classes utilitárias.

**Ferramentas:**

- **Git:** Controle de versão.
- **GitHub:** Hospedagem do repositório remoto.
- **Postman:** Testes da API `/api/chat`.
- **npm:** Gerenciador de pacotes para instalar dependências.
- **VS Code:** Editor de código para desenvolvimento.
- **Navegadores:** Chrome, Firefox, Edge para testes.

**Outros:**

- **OpenAI Platform:** Conta com créditos para acessar a API.
- **PowerShell:** Terminal para comandos no Windows.

**Ambiente:**

- **Node.js v18 ou superior:** Necessário para executar o servidor.
- **Sistema Operacional:** Windows (testado em ambiente Windows 10/11).

## Estrutura do Projeto

FuriaFanBot/  
├── public/  
│ └── index.html  
├── src/  
│ └── server.js  
├── .env.example  
├── .gitignore  
├── package.json  
├── README.md  
└── DOCUMENTATION.md

## Detalhamento dos Arquivos

### 1. `public/index.html`

- **Caminho:** `D:\FuriaFanBot\public\index.html`
- **Funcionalidade:** Página principal que exibe a interface do chat conversacional.
- **Funções Principais:**

  - Exibe o logo da FURIA (na página e como favicon).
  - Renderiza o título, descrição, histórico de mensagens, e input de texto.
  - Envia mensagens ao backend via Fetch (`/api/chat`) e exibe respostas.
  - Permite envio de mensagens com o botão "Enviar" ou tecla Enter.

- **Código Principal:**

  ```html
  <link
    rel="icon"
    type="image/png"
    href="[https://furia.gg/wp-content/uploads/2021/06/logo-furia.png](https://furia.gg/wp-content/uploads/2021/06/logo-furia.png)"
  />
  <img
    src="[https://furia.gg/wp-content/uploads/2021/06/logo-furia.png](https://furia.gg/wp-content/uploads/2021/06/logo-furia.png)"
    alt="FURIA Logo"
    style="max-width: 150px;"
  />
  <div
    id="chat-container"
    class="w-full max-w-md bg-gray-800 p-4 rounded-lg mb-4"
  ></div>
  <input
    id="message-input"
    type="text"
    class="flex-1 p-2 rounded-l-lg bg-gray-700 text-white"
  />
  <button
    onclick="sendMessage()"
    class="p-2 bg-blue-900 text-white rounded-r-lg"
  >
    Enviar
  </button>
  <script>
    async function sendMessage() {
      const message = document.getElementById("message-input").value.trim();
      if (!message) return;
      const chatContainer = document.getElementById("chat-container");
      const userMessage = document.createElement("div");
      userMessage.className = "message user";
      userMessage.textContent = message;
      chatContainer.appendChild(userMessage);
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      const botMessage = document.createElement("div");
      botMessage.className = "message bot";
      botMessage.textContent = data.reply;
      chatContainer.appendChild(botMessage);
    }
  </script>
  ```

- **Tecnologias:** HTML5, JavaScript (ES6), Tailwind CSS, Fetch API.
- **Observações:**
  - Usa Tailwind CSS via CDN, não otimizado para produção.
  - O favicon é um PNG, mas pode ser otimizado para `.ico` (ex.: 32x32 pixels).

### 2. `src/server.js`

- **Caminho:** `D:\FuriaFanBot\src\server.js`
- **Funcionalidade:** Backend que gerencia a API `/api/chat` e integra com a OpenAI.
- **Funções Principais:**

  - Configura o servidor Express para servir arquivos estáticos (`public/`) e processar requisições POST.
  - Usa o cliente OpenAI para enviar mensagens ao modelo `gpt-4o-mini` com um prompt personalizado.
  - Trata erros (ex.: falhas de autenticação ou limite de tokens).

- **Código Principal:**

  ```javascript
  require("dotenv").config();
  const express = require("express");
  const OpenAI = require("openai");
  const app = express();
  app.use(express.json());
  app.use(express.static("public"));
  const openai = new OpenAI({ apiKey: process.env.API_KEY });
  app.post("/api/chat", async (req, res) => {
    const { message } = req.body;
    try {
      const prompt = `Você é o FURIA FanBot... Mensagem do usuário: "${message}"`;
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: message },
        ],
        max_tokens: 150,
        temperature: 0.7,
      });
      res.json({ reply: completion.choices[0].message.content.trim() });
    } catch (error) {
      res.json({
        reply: "Ops, deu um bug no clutch! Tente novamente, fã! 🖤🧡",
      });
    }
  });
  app.listen(3000, () =>
    console.log("Servidor rodando em http://localhost:3000")
  );
  ```

- **Tecnologias:** Node.js, Express, OpenAI API, dotenv.
- **Observações:**
  - A chave `API_KEY` é carregada do `.env` via dotenv, garantindo segurança.
  - O prompt é otimizado para respostas curtas e no tom da FURIA.

### 3. `.env.example`

- **Caminho:** `D:\FuriaFanBot\.env.example`
- **Funcionalidade:** Modelo para o arquivo `.env`, indicando como configurar a chave da OpenAI.
- **Conteúdo:**

  ```
  # Modelo para o arquivo .env
  # Renomeie este arquivo para .env e adicione sua chave da OpenAI
  API_KEY=your-openai-api-key-here
  ```

- **Funções Principais:**

  - Documenta a estrutura do `.env` sem expor a chave real.

- **Tecnologias:** Texto simples.
- **Observações:** O arquivo `.env` real é ignorado pelo `.gitignore`.

### 4. `.gitignore`

- **Caminho:** `D:\FuriaFanBot\.gitignore`
- **Funcionalidade:** Define arquivos e pastas a serem ignorados pelo Git.
- **Conteúdo:**

  ```
  .env
  node_modules/
  ```

- **Funções Principais:**

  - Protege a chave da API (`API_KEY`) no `.env`.
  - Evita o commit de dependências (`node_modules/`).

- **Tecnologias:** Git.
- **Observações:** Essencial para segurança e organização do repositório.

### 5. `package.json`

- **Caminho:** `D:\FuriaFanBot\package.json`
- **Funcionalidade:** Configura o projeto Node.js, incluindo dependências e scripts.
- **Conteúdo Principal:**

  ```json
  {
    "name": "furia-fanbot",
    "version": "1.0.0",
    "description": "Web chat conversacional para fãs da FURIA usando OpenAI (Challenge #1)",
    "main": "src/server.js",
    "scripts": {
      "start": "node src/server.js"
    },
    "dependencies": {
      "express": "^4.18.2",
      "openai": "^4.0.0",
      "dotenv": "^16.0.3"
    }
  }
  ```

- **Funções Principais:**

  - Define o comando `npm start` para iniciar o servidor.
  - Lista dependências necessárias.

- **Tecnologias:** Node.js, npm.
- **Observações:** Gerado automaticamente pelo `npm init` e atualizado com dependências.

### 6. `README.md`

- **Caminho:** `D:\FuriaFanBot\README.md`
- **Funcionalidade:** Fornece uma visão geral do projeto e instruções de configuração/uso.
- **Funções Principais:**

  - Explica o propósito do FURIA FanBot.
  - Lista pré-requisitos, passos de instalação, e exemplos de uso.
  - Inclui seção para o vídeo de apresentação (a ser atualizada).

- **Conteúdo Principal:**

  ```markdown
  # FURIA FanBot

  **FURIA FanBot** é um web chat conversacional desenvolvido para o **Challenge #1** da FURIA...

  ## Funcionalidades

  - Chat Conversacional...

  ## Configuração

  1. Clone o Repositório...
  ```

- **Tecnologias:** Markdown.
- **Observações:** Será atualizado com o link do vídeo de apresentação.

## Fluxo da Aplicação

1.  **Inicialização (`server.js`):**

    - Carrega `API_KEY` do `.env` e inicializa o servidor Express.
    - Configura a rota `/api/chat` e serve `public/index.html`.

2.  **Interação do Usuário (`index.html`):**

    - O usuário digita uma mensagem e clica em "Enviar" ou pressiona Enter.
    - A mensagem é enviada ao backend via Fetch (`POST /api/chat`).

3.  **Processamento (`server.js`):**

    - O backend envia a mensagem à API da OpenAI com um prompt personalizado.
    - A resposta do modelo `gpt-4o-mini` é retornada ao frontend.

4.  **Exibição (`index.html`):**
    - A mensagem do usuário e a resposta do bot são exibidas no histórico.

## Limitações

- **Dados Mockados:** Informações sobre jogos e notícias são simuladas pelo modelo da OpenAI, sem integração com fontes externas (ex.: API do X).
- **Custo da API:** O uso da OpenAI depende dos créditos disponíveis na conta.
- **Frontend:** Tailwind CSS via CDN não é otimizado para produção.
- **Favicon:** Usa um PNG, que pode não ser ideal para todos os navegadores (recomenda-se `.ico`).
- **Histórico:** Não persiste mensagens entre sessões (poderia usar `localStorage`).

## Testes

- **Backend:** Use Postman para testar `POST /api/chat` com payloads como `{ "message": "/proximojogo" }`.
- **Frontend:** Acesse `http://localhost:3000` e teste:
  - **Comandos:** `/proximojogo`, `/noticias`, `/torcida`, `/suporte`.
  - **Mensagens genéricas:** "FURIA é foda!".
- **Logs:** Verifique console do navegador (F12) e terminal para erros.
- **Visual:** Confirme o logo da FURIA (página e favicon) e cores (azul escuro: `#003087`, `bg-blue-900`).

## Conclusão

O FURIA FanBot é uma aplicação web interativa que combina a potência da API da OpenAI com uma interface amigável, oferecendo uma experiência envolvente para os fãs da FURIA. Apesar das limitações (ex.: dados mockados, Tailwind via CDN), o projeto atende aos requisitos do Challenge #1, proporcionando um chat conversacional robusto e alinhado com a identidade da `#FURIACS`.

Desenvolvido por Moacir Domingos para a FURIA! 🖤🧡 `#DIADEFURIA`
