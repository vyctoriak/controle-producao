# Controle de Produção - Plataforma de Gestão

Uma aplicação web moderna para controle de produção de estampas e costura, desenvolvida com Next.js 15, React 19, TypeScript e Tailwind CSS.

## 📋 Descrição

Esta plataforma é um sistema completo de gestão de produção para empresas de confecção, oferecendo controle total sobre:

- **Impressões**: Registro e acompanhamento de produção por tipo de estampa
- **Costuras**: Controle de produtividade e eficiência das costureiras
- **Falhas**: Monitoramento de qualidade (estampa e costura)
- **Relatórios**: Análises detalhadas e gráficos interativos
- **Cadastros**: Gestão de produtos e tipos de estampa

## ✨ Funcionalidades Principais

### 🏠 Dashboard
- Visão geral da produção diária
- Indicadores de performance em tempo real
- Gráficos comparativos semanais
- Distribuição por tipo de estampa
- Análise de falhas por categoria

### 📝 Cadastros
- **Produtos**: Gestão completa da linha de produtos
- **Tipos de Estampa**: Controle dos tipos disponíveis (Sublimação, DTF, Silk, Vinil)

### 📊 Lançamentos
- **Impressões**: Registro diário por tipo de estampa
- **Costuras**: Controle de produtividade com cálculo automático de média por costureira
- **Falhas de Estampa**: Monitoramento de qualidade na impressão
- **Falhas de Costura**: Controle de qualidade na costura

### 📈 Relatórios
- Produção vs Falhas
- Vendas por Produto
- Controle de Envios
- Comparativos Gerais
- Percentuais de Falhas

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 15** - Framework React com App Router
- **React 19** - Biblioteca de interface
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones modernos
- **Recharts** - Biblioteca de gráficos
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas

### UI/UX
- **shadcn/ui** - Componentes de interface
- **Next Themes** - Suporte a temas claro/escuro
- **Sonner** - Sistema de notificações
- **Date-fns** - Manipulação de datas
- **React Day Picker** - Seletor de datas

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm, yarn ou pnpm

### Instalação

1. **Clone o repositório**
```bash
git clone [url-do-repositorio]
cd production-control-platform
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Execute em modo de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

4. **Acesse a aplicação**
```
http://localhost:3000
```

### Scripts Disponíveis

```bash
npm run dev      # Executa em modo desenvolvimento
npm run build    # Gera build de produção
npm run start    # Executa build de produção
npm run lint     # Executa linter
```

## 📁 Estrutura do Projeto

```
production-control-platform/
├── app/                          # App Router (Next.js 15)
│   ├── cadastros/               # Páginas de cadastro
│   │   ├── produtos/           # Gestão de produtos
│   │   └── tipos-estampa/      # Tipos de estampa
│   ├── lancamentos/            # Páginas de lançamentos
│   │   ├── impressoes/         # Registro de impressões
│   │   ├── costuras/           # Registro de costuras
│   │   ├── falhas-estampa/     # Falhas de estampa
│   │   └── falhas-costura/     # Falhas de costura
│   ├── relatorios/             # Páginas de relatórios
│   ├── globals.css             # Estilos globais
│   ├── layout.tsx              # Layout principal
│   └── page.tsx                # Dashboard principal
├── components/                  # Componentes reutilizáveis
│   ├── ui/                     # Componentes base (shadcn/ui)
│   ├── app-sidebar.tsx         # Sidebar da aplicação
│   └── theme-provider.tsx      # Provedor de tema
├── hooks/                      # Custom hooks
├── lib/                        # Utilitários
├── public/                     # Arquivos estáticos
└── styles/                     # Estilos adicionais
```

## 🎨 Interface e Design

### Design System
- **Componentes**: Biblioteca completa de componentes acessíveis
- **Responsividade**: Interface adaptável para desktop e mobile
- **Acessibilidade**: Componentes seguindo padrões WCAG

### Navegação
- **Sidebar**: Menu lateral colapsível com navegação hierárquica
- **Breadcrumbs**: Navegação contextual
- **Toasts**: Notificações em tempo real

## 📊 Funcionalidades de Relatórios

### Tipos de Análise
1. **Produção vs Falhas**: Comparativo entre produção e falhas por período
2. **Vendas por Produto**: Análise de vendas e receita
3. **Controle de Envios**: Tempo de entrega e eficiência logística
4. **Comparativo Geral**: Evolução temporal dos indicadores
5. **Percentuais de Falhas**: Taxa de falhas por tipo de estampa

### Gráficos Disponíveis
- **Barras**: Comparativos e distribuições
- **Linhas**: Tendências temporais
- **Pizza**: Percentuais e proporções
- **Área**: Acumulados e sobreposições

## 🔧 Configuração

### Configurações do Tailwind
O projeto utiliza uma configuração customizada do Tailwind CSS com:
- Sistema de cores personalizado
- Componentes de sidebar
- Animações customizadas
- Suporte a temas

## 📱 Responsividade

A aplicação é totalmente responsiva e otimizada para:
- **Desktop**: Interface completa com sidebar
- **Tablet**: Layout adaptado para telas médias
- **Mobile**: Interface mobile-first com navegação otimizada

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm run build
vercel --prod
```

### Outras Plataformas
A aplicação pode ser deployada em qualquer plataforma que suporte Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Para suporte e dúvidas:
- Abra uma issue no repositório

## 🔮 Roadmap

### Próximas Funcionalidades
- [ ] Autenticação de usuários
- [ ] Integração com banco de dados
- [ ] API REST para integrações
- [ ] Exportação de relatórios em PDF
- [ ] Notificações push
- [ ] Dashboard mobile nativo
- [ ] Integração com sistemas ERP
- [ ] Controle de estoque
- [ ] Gestão de fornecedores
- [ ] Controle financeiro

---

**Desenvolvido com ❤️ por Vyctoria Karina.**