<div align="center">

# 🚀 Tasks API - NestJS Backend

[![NestJS](https://img.shields.io/badge/NestJS-v11-E0234E?style=for-the-badge&logo=nestjs)](https://nestjs.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v15-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org)
[![Jest](https://img.shields.io/badge/Jest-v30-15C213?style=for-the-badge&logo=jest)](https://jestjs.io)
[![Prisma](https://img.shields.io/badge/Prisma-v7-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io)
[![RabbitMQ](https://img.shields.io/badge/RabbitMQ-v3.12-FF6600?style=for-the-badge&logo=rabbitmq)](https://www.rabbitmq.com)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Cloud-4A90E2?style=for-the-badge&logo=cloudinary)](https://cloudinary.com)

<p>
  <strong>API Backend avançada para gerenciamento de tarefas e projetos</strong><br/>
  Desenvolvida durante o <strong>Curso de NestJS</strong> do Professor <a href="https://github.com/wesleymonaro">Wesley Monaro</a>
</p>

[Documentação Swagger](#-documentação-openapi) • [Começar](#-começar-por-aqui) • [Features](#-features-e-recursos) • [Endpoints](#-endpoints-principais) • [Frontend](#-frontend)

</div>

---

## 📋 Sumário

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura](#-arquitetura)
- [Começar por Aqui](#-começar-por-aqui)
- [Configuração](#-configuração)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Documentação OpenAPI](#-documentação-openapi)
- [Features e Recursos](#-features-e-recursos)
- [Endpoints Principais](#-endpoints-principais)
- [Sistema de Autenticação](#-sistema-de-autenticação)
- [Banco de Dados](#-banco-de-dados)
- [RabbitMQ e Mensageria](#-rabbitmq-e-mensageria)
- [Upload de Arquivos](#-upload-de-arquivos)
- [Testes](#-testes)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Boas Práticas Implementadas](#-boas-práticas-implementadas)
- [Frontend](#-frontend)
- [Suporte](#-suporte)
- [Licença](#-licença)

---

## 📌 Sobre o Projeto

**Tasks API** é um backend profissional e escalável desenvolvido em **NestJS** para gerenciar projetos, tarefas, colaboradores e comentários.

Este projeto foi desenvolvido como material educacional do **Curso de NestJS do Professor Wesley Monaro** e demonstra as melhores práticas e padrões arquiteturais da framework, incluindo:

✅ Autenticação e Autorização com JWT  
✅ Arquitetura modular e escalável  
✅ Integração com PostgreSQL via Prisma ORM  
✅ Documentação automática com Swagger/OpenAPI  
✅ Microserviços com RabbitMQ para processamento de emails  
✅ Upload de imagens com Cloudinary  
✅ Testes unitários, de integração e E2E  
✅ Validação de dados com Class Validator  
✅ Guards, Decoradores e Interceptadores customizados  
✅ Versionamento de API  
✅ Paginação de resultados  

---

## 🛠️ Tecnologias Utilizadas

### Core Framework
- **NestJS** - Framework Node.js progressive para aplicações server-side
- **TypeScript** - Superset tipado do JavaScript
- **Express** - Web framework subjacente ao NestJS

### Banco de Dados
- **PostgreSQL** - Database relacional robusto
- **Prisma ORM** - ORM modern para TypeScript/Node.js
- **PostgreSQL Adapter** - Adaptor do Prisma para PostgreSQL

### Autenticação & Segurança
- **JWT (JSON Web Tokens)** - Autenticação stateless
- **Passport.js** - Middleware de autenticação
- **bcrypt** - Hash seguro de senhas

### Microserviços & Messaging
- **RabbitMQ** - Message broker para comunicação async
- **AMQP Connection Manager** - Gerenciador de conexões RabbitMQ
- **amqplib** - Cliente AMQP/RabbitMQ

### Storage & Media
- **Cloudinary** - Serviço de upload e manipulação de imagens
- **Multer** - Middleware para upload de arquivos

### Email & Templates
- **Nodemailer** - Envio de emails
- **Handlebars** - Template engine para emails
- **NestJS Mailer** - Integração de email com NestJS

### Validação & DTOs
- **class-validator** - Validação declarativa de classes
- **class-transformer** - Transformação de objetos

### Documentação & API
- **Swagger/OpenAPI** - Documentação interativa de API
- **NestJS Swagger** - Integração do Swagger com NestJS

### Testes
- **Jest** - Framework de testes JavaScript
- **Supertest** - Testes de requisições HTTP
- **ts-jest** - TypeScript preprocessor para Jest
- **Faker.js** - Geração de dados aleatórios para testes

### Código & Qualidade
- **Biome** - Toolchain de desenvolvimento ultrarrápido
- **Prettier** - Code formatter
- **Eslint** - Linter integrado via Biome

### Utilities
- **dotenv** - Gerenciamento de variáveis de ambiente
- **reflect-metadata** - Suporte a decoradores do TypeScript
- **RxJS** - Reactive programming library

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                        HTTP Requests                         │
│                      (Express Server)                        │
└────────────────────────┬────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
    ┌────▼────┐     ┌────▼────┐     ┌──▼──────┐
    │ Routes  │     │  Guards  │     │Interceptors
    │(v1)     │     │  (JWT)   │     │(Validation)
    └────┬────┘     └─────┬────┘     └────┬─────┘
         │                │               │
         └────────────────┼───────────────┘
                          │
         ┌────────────────▼───────────────┐
         │    Modules & Services         │
         │  ├─ Auth Service              │
         │  ├─ Projects Service          │
         │  ├─ Tasks Service             │
         │  ├─ Users Service             │
         │  ├─ Comments Service          │
         │  ├─ Collaborators Service     │
         │  └─ Mail Service              │
         └────────────────┬───────────────┘
                          │
         ┌────────────────┼──────────────┐
         │                │              │
    ┌────▼────┐      ┌────▼────┐   ┌────▼────┐
    │ Prisma  │      │RabbitMQ │   │Cloudinary
    │ Client  │      │Microsvs │   │Service   │
    └────┬────┘      └────┬────┘   └────┬─────┘
         │                │              │
    ┌────▼────┐      ┌────▼────┐   ┌────▼────┐
    │PostgreSQL│      │Email    │   │Image    │
    │Database  │      │Queue    │   │Storage  │
    └──────────┘      └─────────┘   └─────────┘
```

### Padrões Arquiteturais Implementados

1. **Modular Architecture** - Separação clara de responsabilidades
2. **Service Pattern** - Lógica de negócio isolada em serviços
3. **DTO Pattern** - Data Transfer Objects para validação
4. **Controller-Service-Prisma** - Camadas bem definidas
5. **Dependency Injection** - Containers do NestJS
6. **Middleware Pattern** - Guards e Interceptadores
7. **Event-Driven Architecture** - RabbitMQ para eventos assíncronos

---

## 🎯 Começar por Aqui

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- **Node.js** >= 18.x
- **pnpm** >= 8.x (ou npm/yarn)
- **PostgreSQL** >= 15
- **RabbitMQ** (for async processing)
- **Git**

### Clonando o Repositório

```bash
git clone https://github.com/seu-usuario/tasks-nestjs.git
cd tasks-nestjs
```

### Instalação de Dependências

```bash
# Usando pnpm (recomendado)
pnpm install

# Ou usando npm
npm install

# Ou usando yarn
yarn install
```

### Configuração do Banco de Dados

```bash
# Criar arquivo .env com as variáveis necessárias (veja abaixo)

# Executar migrations do Prisma
pnpm prisma migrate dev

# Gerar Prisma Client
pnpm prisma generate
```

### Iniciando o Servidor

```bash
# Desenvolvimento com hot-reload
pnpm run start:dev

# Ou modo normal
pnpm run start

# Modo produção
pnpm run start:prod
```

A API estará disponível em `http://localhost:3000`  
Documentação Swagger em `http://localhost:3000/api`

---

## ⚙️ Configuração

### 🔑 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
# === Server ===
PORT=3000
NODE_ENV=development

# === Database ===
DATABASE_URL="postgresql://user:password@localhost:5432/tasks_db?schema=public"

# === JWT ===
SECRET_KEY="sua-chave-secreta-super-segura-altere-isso"
JWT_EXPIRATION=1d

# === RabbitMQ ===
RABBITMQ_URL="amqp://guest:guest@localhost:5672"

# === Email Service ===
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=seu-email@gmail.com
MAIL_PASS=sua-senha-de-app
MAIL_FROM=noreply@tasksapi.com
BASE_URL=http://localhost:3000

# === Cloudinary (Optional - para upload de imagens) ===
CLOUDINARY_NAME=seu-cloudinary-name
CLOUDINARY_API_KEY=sua-api-key
CLOUDINARY_API_SECRET=seu-api-secret

# === CORS ===
CORS_ORIGIN=http://localhost:5173
```

### Variáveis de Ambiente Explicadas

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `PORT` | Porta do servidor | `3000` |
| `NODE_ENV` | Ambiente (dev/prod) | `development` |
| `DATABASE_URL` | String de conexão PostgreSQL | `postgresql://...` |
| `SECRET_KEY` | Chave para assinar tokens JWT | `super-secret-key` |
| `JWT_EXPIRATION` | Tempo de expiração do token | `1d`, `24h`, `7d` |
| `RABBITMQ_URL` | URL de conexão RabbitMQ | `amqp://guest:guest@localhost` |
| `MAIL_HOST` | Host SMTP para emails | `smtp.gmail.com` |
| `CLOUDINARY_*` | Credenciais Cloudinary | Retrieved from Cloudinary dashboard |

---

## 📦 Scripts Disponíveis

```bash
# === Desenvolvimento ===
pnpm run start              # Inicia o servidor
pnpm run start:dev          # Inicia em modo watch (hot-reload)
pnpm run start:debug        # Inicia com debugger Node.js

# === Build ===
pnpm run build              # Compila TypeScript para JavaScript

# === Produção ===
pnpm run start:prod         # Inicia versão compilada

# === Testes ===
pnpm run test               # Executa testes unitários
pnpm run test:watch         # Testes em modo watch
pnpm run test:cov           # Testes com coverage report
pnpm run test:debug         # Testes com debugger
pnpm run test:e2e           # Executa testes E2E

# === Qualidade de Código ===
pnpm run lint               # Verifica código com Biome
pnpm run format             # Formata código com Prettier

# === Prisma ===
pnpm prisma migrate dev     # Cria nova migration
pnpm prisma generate        # Gera Prisma Client
pnpm prisma studio         # Abre Prisma Studio (admin UI)
```

---

## 📚 Documentação OpenAPI

A documentação interativa da API está disponível via **Swagger UI** quando o servidor está rodando.

### Acessando a Documentação

**URL:** `http://localhost:3000/api`

### O que você encontra

✅ **Todos os endpoints** documentados com exemplos  
✅ **Modelos de dados** (schemas) detalhados  
✅ **Tipos de respostas** e códigos HTTP  
✅ **Interface interativa** para testar endpoints  
✅ **Autenticação JWT** configurada  
✅ **Paginação** documentada  

### Testando Endpoints no Swagger

1. Abra `http://localhost:3000/api`
2. Clique em qualquer endpoint expandir detalhes
3. Clique em **"Try it out"** para testar
4. Preencha os parâmetros e clique **"Execute"**

Para endpoints protegidos:
1. Primeiro faça login `POST /v1/auth/signin`
2. Copie o token JWT da resposta
3. Clique no botão **"Authorize"** (cadeado no canto superior)
4. Cole o token: `Bearer seu_token_aqui`
5. Agora você pode testar endpoints protegidos

---

## ✨ Features e Recursos

### 🔐 Autenticação & Autorização
- [x] Registro de usuários (Sign Up)
- [x] Login com JWT (Sign In)
- [x] Recuperação de senha (Forgot/Reset Password)
- [x] Alteração de senha
- [x] Perfis de usuário (USER, ADMIN)
- [x] Guards JWT para rotas protegidas
- [x] Contexto de usuário autenticado

### 📁 Gerenciamento de Projetos
- [x] CRUD de projetos
- [x] Projetos por usuário
- [x] Descrição e metadados
- [x] Timestamps (createdAt, updatedAt)
- [x] Paginação de projetos
- [x] Soft delete (cascade delete for tasks)

### ✅ Gerenciamento de Tarefas
- [x] CRUD de tarefas
- [x] Tarefas por projeto
- [x] Status (TODO, IN_PROGRESS, DONE)
- [x] Prioridade (LOW, MEDIUM, HIGH)
- [x] Data de vencimento (dueDate)
- [x] Atribuição de tarefas a usuários
- [x] Paginação de tarefas
- [x] Filtros por status/prioridade

### 👥 Sistema de Colaboradores
- [x] Adicionar colaboradores a projetos
- [x] Papéis (VIEWER, EDITOR, OWNER)
- [x] CRUD de colaboradores
- [x] Listar colaboradores do projeto
- [x] Validação de permissões
- [x] Relação única usuário-projeto

### 💬 Sistema de Comentários
- [x] Comentários em tarefas
- [x] CRUD de comentários
- [x] Autor do comentário
- [x] Timestamps
- [x] Paginação de comentários
- [x] Relacionamento com tarefa e usuário

### 👤 Gerenciamento de Usuários
- [x] CRUD de usuários
- [x] Upload de avatar
- [x] Integração com Cloudinary
- [x] Busca e listagem paginada
- [x] Atualização de perfil
- [x] Soft delete de usuários

### 📧 Sistema de Email
- [x] Integração com RabbitMQ
- [x] Email queue para processamento assíncrono
- [x] Template de recuperação de senha
- [x] Nodemailer + Handlebars
- [x] Event-driven architecture
- [x] Consumer para processar emails

### 🖼️ Upload de Imagens
- [x] Integração com Cloudinary
- [x] Upload de avatares
- [x] Validação de arquivos
- [x] Otimização automática
- [x] URLs públicas

### 🧪 Testes
- [x] Testes unitários com Jest
- [x] Testes de integração
- [x] Testes E2E (End-to-End)
- [x] Coverage reports
- [x] Mock data generators
- [x] Test utilities

---

## 🔌 Endpoints Principais

### 🔑 Autenticação
```http
POST /v1/auth/signup              # Registrar novo usuário
POST /v1/auth/signin              # Fazer login
GET  /v1/auth/me                  # Obter dados do usuário logado
POST /v1/auth/change-password     # Alterar senha
POST /v1/auth/forgot-password     # Solicitar reset de senha
PUT  /v1/auth/reset-password      # Resetar senha
```

### 📁 Projetos
```http
GET    /v1/projects               # Listar projetos (com paginação)
GET    /v1/projects/:projectId    # Obter projeto específico
POST   /v1/projects               # Criar novo projeto
PUT    /v1/projects/:projectId    # Atualizar projeto
DELETE /v1/projects/:projectId    # Deletar projeto
```

### ✅ Tarefas
```http
GET    /v1/projects/:projectId/tasks           # Listar tarefas do projeto
GET    /v1/projects/:projectId/tasks/:taskId   # Obter tarefa específica
POST   /v1/projects/:projectId/tasks           # Criar nova tarefa
PUT    /v1/projects/:projectId/tasks/:taskId   # Atualizar tarefa
DELETE /v1/projects/:projectId/tasks/:taskId   # Deletar tarefa
```

### 💬 Comentários
```http
GET    /v1/projects/:projectId/tasks/:taskId/comments           # Listar comentários
GET    /v1/projects/:projectId/tasks/:taskId/comments/:id       # Obter comentário
POST   /v1/projects/:projectId/tasks/:taskId/comments           # Criar comentário
PUT    /v1/projects/:projectId/tasks/:taskId/comments/:id       # Atualizar comentário
DELETE /v1/projects/:projectId/tasks/:taskId/comments/:id       # Deletar comentário
```

### 👥 Colaboradores
```http
GET    /v1/projects/:projectId/collaborators           # Listar colaboradores
POST   /v1/projects/:projectId/collaborators           # Adicionar colaborador
PUT    /v1/projects/:projectId/collaborators/:userId   # Atualizar papel
DELETE /v1/projects/:projectId/collaborators/:userId   # Remover colaborador
```

### 👤 Usuários
```http
GET    /v1/users                  # Listar usuários (com paginação)
GET    /v1/users/:userId          # Obter usuário específico
POST   /v1/users                  # Criar novo usuário
PUT    /v1/users/:userId          # Atualizar usuário
DELETE /v1/users/:userId          # Deletar usuário
POST   /v1/users/avatar           # Upload de avatar
```

### 📖 Documentação Completa
Todas as respostas, códigos HTTP e exemplos estão disponíveis em:  
**`http://localhost:3000/api`** ← Swagger UI

---

## 🔐 Sistema de Autenticação

### Fluxo de Autenticação

```
┌──────────────────────────────────────────────────────┐
│ 1. Cliente faz POST /v1/auth/signin                  │
│    com email e senha                                 │
└──────────────────────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────┐
│ 2. AuthService valida credenciais                    │
│    - Busca usuário por email                         │
│    - Compara hash de senha com bcrypt                │
└──────────────────────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────┐
│ 3. Se válido, JWT é gerado                           │
│    - Payload: { id, email, sub }                     │
│    - Expirado em: 1 dia                              │
└──────────────────────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────┐
│ 4. Token é retornado ao cliente                      │
│    { access_token: "eyJhbGc..." }                    │
└──────────────────────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────┐
│ 5. Cliente adiciona token em requisições             │
│    Header: Authorization: Bearer <token>             │
└──────────────────────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────┐
│ 6. JwtAuthGuard valida token                         │
│    - Passport extrai payload                         │
│    - RequestContext armazena usuário                 │
└──────────────────────────────────────────────────────┘
```

### JWT Configuration

```typescript
// Configurado em auth.module.ts
JwtModule.register({
    secret: process.env.SECRET_KEY,
    signOptions: { expiresIn: '1d' }
})
```

### Endpoints de Autenticação

**Sign Up (Registro)**
```bash
POST /v1/auth/signup
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "SenhaForte123!"
}

# Response: 201 Created
{
  "id": "uuid",
  "name": "João Silva",
  "email": "joao@email.com",
  "access_token": "eyJhbGc..."
}
```

**Sign In (Login)**
```bash
POST /v1/auth/signin
Content-Type: application/json

{
  "email": "joao@email.com",
  "password": "SenhaForte123!"
}

# Response: 200 OK
{
  "access_token": "eyJhbGc..."
}
```

**Forgot Password**
```bash
POST /v1/auth/forgot-password
Content-Type: application/json

{
  "email": "joao@email.com"
}

# Response: 200 OK
# Email é enviado via RabbitMQ com link de reset
```

### Guards e Decoradores

**JwtAuthGuard** - Valida token JWT em rotas protegidas
```typescript
@UseGuards(JwtAuthGuard)
@Get('me')
me(@AuthenticatedUser() user: User) {
    return user;
}
```

**@AuthenticatedUser()** - Decorador para injetar usuário autenticado
```typescript
@Get('profile')
@UseGuards(JwtAuthGuard)
getProfile(@AuthenticatedUser() user: User) {
    return user;
}
```

---

## 📊 Banco de Dados

### Modelo de Dados (Schema Prisma)

```prisma
// Users - Usuários do sistema
model User {
  id              String
  name            String
  email           String (único)
  password        String (hashed com bcrypt)
  avatar          String? (URL Cloudinary)
  role            Role (USER ou ADMIN)
  createdAt       DateTime
  updatedAt       DateTime
  
  // Relações
  createdProjects Project[]
  tasksAssigned   Task[]
  collaborations  ProjectCollaborator[]
  comments        Comment[]
}

// Projects - Projetos
model Project {
  id          String
  name        String
  description String?
  createdAt   DateTime
  updatedAt   DateTime
  createdById String (FK para User)
  
  // Relações
  createdBy       User
  collaborators   ProjectCollaborator[]
  tasks           Task[]
}

// ProjectCollaborator - Colaboradores em projetos
model ProjectCollaborator {
  id        String
  role      CollaboratorRole (VIEWER, EDITOR, OWNER)
  userId    String (FK)
  projectId String (FK)
  createdAt DateTime
  
  // Constraints
  unique([userId, projectId])
  
  // Relações
  project   Project
  user      User
}

// Tasks - Tarefas
model Task {
  id          String
  title       String
  description String?
  status      TaskStatus (TODO, IN_PROGRESS, DONE)
  priority    TaskPriority (LOW, MEDIUM, HIGH)
  dueDate     DateTime?
  createdAt   DateTime
  updatedAt   DateTime
  projectId   String (FK)
  assigneeId  String? (FK)
  
  // Relações
  project     Project
  assignee    User?
  comments    Comment[]
}

// Comments - Comentários em tarefas
model Comment {
  id        String
  content   String
  authorId  String (FK)
  taskId    String (FK)
  createdAt DateTime
  updatedAt DateTime
  
  // Relações
  author    User
  task      Task
}

// Enums
enum Role {
  USER
  ADMIN
}

enum CollaboratorRole {
  VIEWER
  EDITOR
  OWNER
}

enum TaskStatus {
  TODO
  IN_PROGRESS
  DONE
}

enum TaskPriority {
  LOW
  MEDIUM
  HIGH
}
```

### Scripts de Migration

```bash
# Criar nova migration
pnpm prisma migrate dev --name "nome_da_migracao"

# Ver status das migrations
pnpm prisma migrate status

# Reset do banco (deleta e executa todas)
pnpm prisma migrate reset

# Abrir Prisma Studio (UI admin)
pnpm prisma studio
```

---

## 📬 RabbitMQ e Mensageria

### Visão Geral

O sistema implementa **Event-Driven Architecture** usando RabbitMQ para processar emails de forma assíncrona.

### Arquitetura do Sistema de Email

```
┌─────────────────────────────────────────────────────────┐
│ HTTP Request (POST /auth/forgot-password)               │
└──────────────────────────┬────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│ AuthService                                              │
│ ├─ Valida email                                          │
│ └─ Gera token de reset                                   │
└──────────────────────────┬───────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│ MailService.sendPasswordRequest()                        │
│ ├─ Cria objeto: { email, url }                           │
│ └─ Emite evento via ClientProxy (RabbitMQ)               │
└──────────────────────────┬───────────────────────────────┘
                           │
                    ╔──────▼──────╗
                    ║  RabbitMQ   ║
                    ║ email_queue ║
                    ╚──────┬──────╝
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│ MailConsumer (Microservice Pattern)                      │
│ ├─ É um Listener em RabbitMQ                             │
│ ├─ Aguarda eventos SEND_PASSWORD_RESET                   │
│ └─ Processa envio de email                               │
└──────────────────────────┬───────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│ MailerService (Nodemailer)                               │
│ ├─ Carrega template Handlebars                           │
│ ├─ Renderiza template com dados                          │
│ └─ Envia email via SMTP                                  │
└──────────────────────────┬───────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│ Email enviado ao usuário ✓                               │
│ "Clique aqui para resetar sua senha"                     │
└──────────────────────────────────────────────────────────┘
```

### Configuração RabbitMQ

**main.ts**
```typescript
app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,  // RabbitMQ Transport
    options: {
        urls: [process.env.RABBITMQ_URL],
        queue: EMAIL_QUEUE,
        queueOptions: { durable: true },  // Persiste fila após restart
    },
})

await app.startAllMicroservices()
```

### MailConsumer (Listener)

```typescript
@Controller()
export class MailConsumer {
    constructor(private readonly mailer: MailerService) {}

    @EventPattern(SEND_PASSWORD_RESET)
    async handlePasswordReset(@Payload() data: { email: string; url: string }) {
        await this.mailer.sendMail({
            to: data.email,
            subject: 'Redefinição de senha',
            template: 'forgot-password.hbs',
            context: { url: data.url },
        })
    }
}
```

### MailService (Producer)

```typescript
@Injectable()
export class MailService {
    constructor(@Inject(EMAIL_SERVICE) private client: ClientProxy) {}

    async sendPasswordRequest(email: string, token: string) {
        const url = `${process.env.BASE_URL!}/auth/reset-password?token=${token}`
        
        // Emite evento para RabbitMQ
        this.client.emit(SEND_PASSWORD_RESET, { email, url })
    }
}
```

### Benefícios da Arquitetura

✅ **Não-Bloqueante** - Requisição HTTP retorna imediatamente  
✅ **Escalável** - Múltiplos workers podem processar emails  
✅ **Resiliente** - Fila persiste se serviço cair  
✅ **Desacoplado** - MailService não depende de MailerService  
✅ **Assíncrono** - Processamento em background  

---

## 🖼️ Upload de Arquivos

### Integração Cloudinary

O sistema suporta upload de avatares usando **Cloudinary**, um serviço de armazenamento e otimização de imagens em nuvem.

### Fluxo de Upload

```
┌──────────────────────────────────────────────────────────┐
│ POST /v1/users/avatar                                    │
│ MultipartForm-Data: { file: <image> }                    │
└───────────────────────────┬────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────┐
│ UsersController                                          │
│ @UseInterceptors(FileInterceptor('file'))                │
└───────────────────────────┬────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────┐
│ CloudinaryService.uploadAvatar()                         │
│ ├─ Valida arquivo                                        │
│ ├─ Faz upload para Cloudinary                            │
│ └─ Retorna URL pública                                   │
└───────────────────────────┬────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────┐
│ UsersService.update()                                    │
│ └─ Atualiza campo avatar do usuário no BD                │
└───────────────────────────┬────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────┐
│ Response: 200 OK                                         │
│ { avatar: "https://res.cloudinary.com/..." }             │
└──────────────────────────────────────────────────────────┘
```

### Endpoint de Upload

```bash
POST /v1/users/avatar
Authorization: Bearer <token>
Content-Type: multipart/form-data

Form Data:
  file: <image file> (JPEG, PNG, WebP)

Response: 200 OK
{
  "id": "uuid",
  "name": "João Silva",
  "email": "joao@email.com",
  "avatar": "https://res.cloudinary.com/...",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:35:00Z"
}
```

---

## 🧪 Testes

O projeto implementa testes robustos em três níveis:

### 1. Testes Unitários (Unit Tests)

Testam funções e métodos isoladamente, mocando dependências.

```bash
pnpm run test                  # Executa todos os testes
pnpm run test:watch           # Modo watch (rerun ao salvar)
pnpm run test:cov             # Gera relatório de cobertura
```

### 2. Testes de Integração (Integration Tests)

Testam múltiplos componentes trabalhando juntos.

```bash
pnpm run test                  # Testes de integração inclusos
```

### 3. Testes E2E (End-to-End Tests)

Testam fluxos completos pela API HTTP.

```bash
pnpm run test:e2e              # Executa testes E2E
```

### Coverage Report

Após executar `pnpm run test:cov`, abra o relatório em:
```
./coverage/lcov-report/index.html
```

Você verá:
- ✅ Cobertura por arquivo
- ✅ Linhas testadas vs não testadas
- ✅ Branches de código
- ✅ Functions cobertas

### Mock Data Generators (Faker.js)

O projeto usa **@faker-js/faker** para gerar dados realistas em testes:

```typescript
import { faker } from '@faker-js/faker'

export function createMockUser() {
    return {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: 'hashed_password',
        avatar: faker.image.avatar(),
        role: 'USER',
    }
}
```

---

## 📁 Estrutura de Pastas

```
tasks-nestjs/
├── 📄 package.json              # Dependências do projeto
├── 📄 tsconfig.json             # Configuração TypeScript
├── 📄 nest-cli.json             # Configuração NestJS CLI
├── 📄 biome.json                # Configuração Biome (linter)
├── 📄 README.md                 # Este arquivo
│
├── 📁 prisma/
│   └── schema.prisma            # 🗄️ Schema do banco de dados
│
├── 📁 src/
│   ├── 🚀 main.ts               # Entrada da aplicação
│   ├── 📋 app.module.ts         # Módulo raiz
│   ├── 📋 app.controller.ts     # Controller raiz
│   ├── 📋 app.service.ts        # Service raiz
│   ├── 📄 consts.ts             # Constantes globais
│   │
│   ├── 📁 common/               # 🔧 Código compartilhado
│   │   ├── decorators/          # Decoradores customizados
│   │   ├── dtos/                # DTOs compartilhados
│   │   ├── guards/              # Guards (autenticação)
│   │   ├── interceptors/        # Interceptadores
│   │   ├── services/            # Serviços compartilhados
│   │   └── swagger/             # Documentação Swagger
│   │
│   ├── 📁 modules/              # 📦 Feature modules
│   │   ├── auth/                # Autenticação
│   │   ├── users/               # Gerenciamento de usuários
│   │   ├── projects/            # Gerenciamento de projetos
│   │   ├── tasks/               # Gerenciamento de tarefas
│   │   ├── comments/            # Sistema de comentários
│   │   ├── collaborators/       # Gerenciamento de colaboradores
│   │   ├── mail/                # Serviço de email
│   │   └── prisma/              # Integração com Prisma
│   │
│   └── 📁 utils/                # Utilitários
│
├── 📁 test/                     # 🧪 Testes E2E
│   ├── app.e2e-spec.ts          # Testes E2E
│   └── jest-e2e.json            # Configuração Jest
│
└── 📁 coverage/                 # 📊 Relatórios de cobertura
```

---

## 🎯 Boas Práticas Implementadas

### ✅ Arquitetura & Design Patterns

- **Modular Architecture** - Separação clara de responsabilidades
- **Service Layer Pattern** - Lógica de negócio isolada
- **Repository Pattern** - Abstração de acesso a dados (Prisma)
- **Dependency Injection** - Usando containers NestJS
- **Decorator Pattern** - Decoradores customizados
- **Observer Pattern** - Event-driven com RabbitMQ

### ✅ Segurança

- **Password Hashing** - Bcrypt com salt
- **JWT Authentication** - Stateless e seguro
- **Guards** - Validação de autorização/autenticação
- **Input Validation** - Class Validator em todos os DTOs
- **SQL Injection Prevention** - Prisma ORM
- **CORS Configuration** - Endpoints especificados

### ✅ Performance

- **Pagination** - Limita resultados recuperados
- **Lazy Loading** - Carrega dados sob demanda
- **Async/Await** - Operações não-bloqueantes
- **Connection Pooling** - Prisma gerencia pool

### ✅ Code Quality

- **TypeScript Strict** - Tipagem forte
- **Linting** - Biome para análise estática
- **Formatting** - Prettier para consistência
- **Testing** - Cobertura em 3 níveis
- **Comments** - Código bem documentado

### ✅ Documentation

- **Swagger/OpenAPI** - Documentação interativa
- **Type Definitions** - DTOs e interfaces
- **README** - Documentação completa
- **Error Messages** - Mensagens claras

---

## 📱 Frontend

Este repositório contém apenas o **Backend API**. O **Frontend** está em um repositório separado e será atualizado em breve neste mesmo repositório.

### Links do Frontend

| Recurso | Link |
|---------|------|
| **Repositório Frontend** | [Em breve - será adicionado] |
| **Deploy Frontend** | [Em breve] |

### Requisitos do Frontend

- React 18+ ou framework similar
- Autenticação JWT
- Consumo de API em `http://localhost:3000` (desenvolvimento)
- Suporta upload de imagens
- Versionamento de API (`/v1`)

---

## 🆘 Suporte

### Documentação

- 📖 [Documentação NestJS](https://docs.nestjs.com)
- 📖 [Documentação Prisma](https://www.prisma.io/docs)
- 📖 [Documentação Swagger](https://swagger.io/docs)
- 📖 [RabbitMQ Docs](https://www.rabbitmq.com/documentation.html)

### Problemas Comuns

**Erro de conexão ao PostgreSQL**
```bash
# Verifique se PostgreSQL está rodando
psql postgresql://user:password@localhost:5432/tasks_db
```

**Erro de conexão ao RabbitMQ**
```bash
# Docker:
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.12-management
```

**Swagger não aparece**
```bash
pnpm install
pnpm run start:dev
# Acesse http://localhost:3000/api
```

---

## 📄 Licença

Este projeto é **UNLICENSED** e foi desenvolvido como material educacional do Curso de NestJS do Professor Wesley Monaro.

---

## 👨‍💼 Autor & Créditos

**Desenvolvido como material educacional do:**

[Wesley Monaro - Monaro Dev](https://github.com/wesleymonaro)

**Características do Curso:**
- ✅ Fundamentos de NestJS
- ✅ Estrutura Modular
- ✅ Autenticação com JWT
- ✅ Banco de Dados com Prisma
- ✅ Microserviços com RabbitMQ
- ✅ Upload de Arquivos
- ✅ Testes Automatizados
- ✅ Documentação com Swagger

---

## 🚀 Próximos Passos

Após clonar e configurar:

1. ✅ Instale dependências: `pnpm install`
2. ✅ Configure `.env` com suas credenciais
3. ✅ Execute migrations: `pnpm prisma migrate dev`
4. ✅ Inicie servidor: `pnpm run start:dev`
5. ✅ Acesse docs: `http://localhost:3000/api`
6. ✅ Execute testes: `pnpm run test`

---

<div align="center">

**Desenvolvido com ❤️ durante o Curso de NestJS**

Made with passion by [Wesley Monaro](https://github.com/wesleymonaro)

[⬆ voltar ao topo](#-tasks-api---nestjs-backend)

</div>
