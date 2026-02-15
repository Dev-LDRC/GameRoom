# GameRoom - projeto launcher de jogos com assinatura

Este projeto é uma aplicação projetada para simular uma plataforma de loja de jogos, semelhante à Steam ou Epic Games. Ele é construído com uma arquitetura de frontend e backend desacoplados, utilizando tecnologias web modernas.

## Sumário

- [Funcionalidades](#funcionalidades)
- [Pilha de Tecnologia](#pilha-de-tecnologia)
    - [Frontend](#frontend)
    - [Backend](#backend)
- [Executando a Aplicação](#executando-a-aplicação)
- [Endpoints da API](#endpoints-da-api)

## Funcionalidades

-   **Autenticação de Usuário:** Registro, login e gerenciamento de sessões de usuário.
-   **Catálogo de Jogos:** Navegue pelos jogos disponíveis, filtráveis por níveis de assinatura.
-   **Planos de Assinatura:** Visualize e potencialmente gerencie diferentes níveis de assinatura (Básico, Premium, Ultimate).
-   **Sala de Jogos do Usuário:** Uma área personalizada para usuários logados visualizarem seus jogos acessíveis.
-   **Perfil do Usuário:** Visualize e atualize as informações do perfil do usuário.
-   **Integração Stripe:** Backend pronto para lidar com webhooks do Stripe para gerenciamento de assinaturas.

## Pilha de Tecnologia

### Frontend

-   **Framework:** React 19
-   **Ferramenta de Build:** Vite
-   **Linguagem:** TypeScript
-   **Estilização:** TailwindCSS
-   **Roteamento:** React Router DOM
-   **Gerenciamento de Estado/Busca de Dados:** `@tanstack/react-query`
-   **Manipulação e Validação de Formulários:** `react-hook-form` com `zod`
-   **Autenticação:** Biblioteca `better-auth` (integrada com o backend)
-   **Notificações:** `react-toastify`
-   **Linting/Formatação:** Biome

### Backend

-   **Framework:** NestJS (Node.js)
-   **Linguagem:** TypeScript
-   **Banco de Dados:** PostgreSQL
-   **ORM:** Drizzle ORM
-   **Autenticação:** `@mguay/nestjs-better-auth` (better-auth integrado com NestJS), `bcryptjs` para hash de senha.
-   **Serviços Externos:** Stripe (para pagamentos/assinaturas)
-   **Variáveis de Ambiente:** `dotenv` (`@nestjs/config`)
-   **Linting/Formatação:** Biome

## Configuração e Instalação

### Pré-requisitos

-   Node.js (v18 ou superior recomendado)
-   Gerenciador de Pacotes (``npm``, ``yarn`` ou ``bun``)
-   Banco de dados PostgreSQL
-   Git
-   Stripe CLI [https://docs.stripe.com/stripe-cli/install](https://docs.stripe.com/stripe-cli/install)

### Clone este repositório:

```bash
git clone https://github.com/Dev-LDRC/GameRoom.git
```

### Configuração do Backend

1.  **Navegue até o diretório do backend:**
    ```bash
    cd be
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    # ou yarn install
    ```
3.  **Crie um arquivo `.env`** no diretório `be` copiando `be/.env.example` e preenchendo os detalhes.
    Você precisará de pelo menos:
    -   `PORT=4444` (ou a porta desejada para o backend)
    -   `DATABASE_URL="postgresql://usuario:senha@host:porta/banco"` (sua string de conexão PostgreSQL, originalmente obtida do Supabase)
    -   `STRIPE_SECRET_KEY=sua_chave_secreta_do_stripe` (para integração com Stripe)
    -   `STRIPE_WEBHOOK_SECRET=seu_segredo_do_webhook_do_stripe` (para webhooks do Stripe)
    -   `BETTER_AUTH_SECRET=uma_string_longa_e_aleatoria` (para a biblioteca better-auth)

4.  **Execute as migrações do banco de dados:**
    ```bash
    npm run db:migrate
    ```
    Isso criará as tabelas necessárias em seu banco de dados PostgreSQL com base no esquema do Drizzle.

### Configuração do Frontend

1.  **Navegue até o diretório do frontend:**
    ```bash
    cd fe
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    # ou yarn install
    ```
3.  **Crie um arquivo `.env`** no diretório `fe` copiando `fe/.env.example` e preenchendo os detalhes.
    Você precisará de pelo menos:
    -   `VITE_BACKEND_URL=http://localhost:4444` (ou a URL onde seu backend está sendo executado)
    -   `VITE_SUPABASE_URL=https://sua_url_do_supabase` (a URL do seu projeto Supabase)
    -   `VITE_SUPABASE_ANON_KEY=sua_chave_anonima_publica_do_supabase` (sua chave anônima pública do Supabase)

### Configuração de Webhook do Stripe (Desenvolvimento Local)

Para testar webhooks do Stripe localmente, você precisará do Stripe CLI.

1.  **Instale o Stripe CLI:**
    Siga as instruções oficiais para instalar o Stripe CLI para o seu sistema operacional: [https://docs.stripe.com/stripe-cli/install](https://docs.stripe.com/stripe-cli/install)

2.  **Faça login no Stripe CLI:**
    ```bash
    stripe login
    ```

3.  **Encaminhe webhooks para o seu backend local:**
    Inicie seu backend primeiro (conforme descrito em "Executando a Aplicação" abaixo) para que ele esteja ouvindo as requisições. Em seguida, em um terminal separado, execute o seguinte comando:
    ```bash
    stripe listen --forward-to localhost:4444/subscriptions/webhooks/stripe
    ```
    Substitua `4444` pela porta real em que seu backend está sendo executado, se for diferente.
    O Stripe CLI exibirá um segredo de webhook. Copie este segredo e defina-o como a variável de ambiente `STRIPE_WEBHOOK_SECRET` em seu arquivo `be/.env`.

## Executando a Aplicação

1.  **Inicie o Backend:**
    Navegue até o diretório `be` e execute:
    ```bash
    npm run start:dev
    ```
    O backend normalmente será executado em `http://localhost:4444`.

2.  **Inicie o Frontend:**
    Navegue até o diretório `fe` e execute:
    ```bash
    npm run dev
    ```
    O frontend normalmente será executado em `http://localhost:5173`.

Assim que ambos estiverem em execução, abra seu navegador em [http://localhost:5173](http://localhost:5173) para acessar a aplicação.

## Endpoints da API

Aqui estão alguns dos principais endpoints da API expostos pelo backend:

-   **Autenticação:**
    -   `POST /api/auth/sign-up/email` (para registro de usuário)
    -   `POST /api/auth/sign-in/email` (para login de usuário)
    -   ...e outros endpoints relacionados ao `better-auth` (consulte a documentação do `better-auth`)

-   **Jogos:**
    -   `GET /games`: Obtenha todos os jogos disponíveis (público).
    -   `GET /games/plan/:userPlan`: Obtenha jogos específicos do plano de assinatura de um usuário (autenticado).
    -   `GET /games/check`: Verificação de saúde para o serviço de jogos (público).

-   **Usuários:**
    -   `GET /users/username`: Obtenha o nome de usuário do usuário autenticado.

-   **Assinaturas:**
    -   `POST /subscriptions/webhooks/stripe`: Endpoint para webhooks do Stripe (interno pelo Stripe).
