# Dengo 3D Lab - Plataforma de E-commerce & Gestão

Uma plataforma completa de e-commerce e gestão (ERP/Painel Admin) para impressão 3D, construída com React 19, Vite, Tailwind CSS e Zustand.

## 🚀 Tecnologias

- **Frontend:** React 19, TypeScript, Tailwind CSS, Lucide React
- **Build Tool:** Vite
- **Gerenciamento de Estado:** Zustand
- **Roteamento:** Zustand (Custom Router Store para navegação interna sem dependências pesadas)
- **Componentes Base:** Arquitetura baseada em Headless UI, Acessível, inspirado no shadcn/ui.
- **Gráficos:** Recharts

## 📁 Estrutura do Projeto

```
src/
├── components/      # Componentes reutilizáveis (UI, Negócio, Feedback)
├── config/          # Variáveis de ambiente e configuração da loja
├── hooks/           # Custom hooks (toast, media queries, debounce)
├── layouts/         # Layouts base (Store, Admin, Auth)
├── mocks/           # Dados falsos (Seed) para desenvolvimento local
├── pages/           # Páginas principais da aplicação e do painel admin
├── schemas/         # Validação (Zod)
├── services/        # Abstração de acesso a dados (API Real vs Mock)
├── stores/          # Estado global (Zustand: Carrinho, Auth, UI, Navegação)
├── types/           # Definições globais de interfaces TypeScript
└── utils/           # Formatadores de moeda, data e validações auxiliares
```

## 🛠️ Configuração e Instalação

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Variáveis de Ambiente:**
   Copie `.env.example` para `.env` e ajuste se necessário.
   ```bash
   cp .env.example .env
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

## 🗄️ Backend e API Mock

Por padrão, a aplicação roda em modo "Mock", interceptando as chamadas e retornando dados locais (`src/mocks/`).

Para conectar com um Backend REST Real:
1. Abra seu arquivo `.env`
2. Mude `VITE_USE_MOCK_API=false`
3. Defina a URL do seu backend em `VITE_API_BASE_URL` (ex: `http://localhost:8080/api`)

Os `services/` (ex: `productService.ts`) validarão o modo `USE_MOCK_API`. Caso falso, eles passarão as chamadas para o `apiClient`, enviando requisições REST verdadeiras.

## 👥 Contas de Teste (Auth Mock)

Ao rodar localmente com a Mock API, os seguintes usuários estão disponíveis para testes:

**Cliente Comum:**
- Email: `user@example.com`
- Senha: `password`
- *Acesso:* Loja, Minha Conta, Meus Pedidos

**Super Admin:**
- Email: `admin@example.com`
- Senha: `admin`
- *Acesso:* Acesso total ao painel administrativo (Produtos, Finanças, Configurações, Equipe)

**Operador de Produção:**
- Email: `operator@dengo3d.com`
- Senha: `print`
- *Acesso:* Limitado ao Kanban de Produção (Fila de Impressão)

## 🏗️ Build para Produção

Execute o comando de build do Vite:
```bash
npm run build
```
Os arquivos otimizados serão gerados na pasta `dist/`.

## 🎨 Tematização e Estilos

Toda a identidade visual baseia-se no **Tailwind CSS**. 
O arquivo de configuração define cores exclusivas da marca (Candy, Cherry, Bubblegum).
Os ícones são padronizados utilizando a biblioteca `lucide-react`.

---
*Desenvolvido sob medida.*
