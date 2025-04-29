# FURIA FanBot

FURIA FanBot é um web chat conversacional desenvolvido para o **Challenge #1** da FURIA, permitindo que fãs do time de Counter-Strike interajam com um bot alimentado pela API da OpenAI. O bot responde a perguntas sobre jogos, notícias, torcida, e suporte, com o tom entusiasmado da `#FURIACS`.

## Funcionalidades

* **Chat Conversacional:**
    * Respostas naturais usando o modelo `gpt-4o-mini` da OpenAI.
    * Suporte a comandos:
        * `/proximojogo`: Informa o próximo jogo (mockado).
        * `/noticias`: Lista notícias recentes.
        * `/torcida`: Gera gritos de torcida (ex.: "VAMOS, FURIA!").
        * `/suporte`: Responde sobre loja, ingressos, etc.
    * Respostas genéricas com tom de fã (ex.: "FURIA é foda!" → "Aí sim, fã raiz! 💪").
* **Interface:**
    * Design nas cores da FURIA (preto e laranja).
    * Histórico de mensagens e input de texto.

## Tecnologias Utilizadas

* **Frontend:** HTML, JavaScript, Tailwind CSS (via CDN).
* **Backend:** Node.js, Express, OpenAI API.
* **Segurança:** Chave da API em variável de ambiente (`API_KEY`).
* **Outros:** Git, Postman (para testes).

## Pré-requisitos

* Node.js (v18 ou superior).
* Conta na OpenAI com chave API.
* Navegador moderno (Chrome, Firefox, Edge).

## Configuração

1.  **Clone o Repositório:**
    ```bash
    git clone [https://github.com/](https://github.com/)<seu-usuario>/FuriaFanBot.git
    cd FuriaFanBot
    ```
    *(Substitua `<seu-usuario>` pelo seu nome de usuário no GitHub)*

2.  **Instale Dependências:**
    ```bash
    npm install
    ```

3.  **Configure a Chave da OpenAI:**
    * **Opção 1 (Variável de Ambiente):**
        ```bash
        $env:API_KEY = "sua-chave-da-openai"
        ```
    * **Opção 2 (Arquivo `.env`):**
        Crie um arquivo `.env` com base em `.env.example`:
        ```
        API_KEY=sua-chave-da-openai
        ```

4.  **Execute a Aplicação:**
    ```bash
    npm start
    ```

5.  **Acesse:** Abra [`http://localhost:3000`](http://localhost:3000).

## Testes

* **Comandos:** `/proximojogo`, `/noticias`, `/torcida`, `/suporte`.
* **Mensagens Genéricas:** "FURIA é foda!", "Quem joga amanhã?".
* **Logs:** Verifique o console do navegador (F12) e o terminal.

## Limitações

* **Dados Mockados:** Informações sobre jogos e notícias são simuladas (sem integração com API externa).
* **Custo da API:** O uso da OpenAI depende dos créditos disponíveis.
* **Frontend:** Tailwind CSS via CDN, não otimizado para produção.

## Estrutura do Projeto

FuriaFanBot/  
├── public/  
│ ├── index.html  
├── src/  
│ ├── server.js  
├── .env.example  
├── .gitignore  
├── package.json  
├── README.md


Desenvolvido com 💪 para a FURIA! #DIADEFURIA
