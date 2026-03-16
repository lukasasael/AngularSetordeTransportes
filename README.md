Deploy:
https://asdt2.vercel.app/

# Painel de Combustíveis – VLAB

Frontend desenvolvido em Angular para visualização de dados de consumo e preço de combustíveis, seguindo o **Padrão Digital de Governo (DSGOV)**.

## 🎯 Objetivo
Criar um painel gerencial com foco em:
- Clareza visual
- Aderência ao padrão gov.br
- Componentização e arquitetura limpa

## 🧱 Stack
- Angular 21 (Standalone)
- TypeScript
- SCSS
- Control Flow moderno (`@if`, `@for`)

## 🏗️ Arquitetura
- Componentes standalone
- Facade Pattern para abstração de dados
- Dados vindos de API externa hosteada no render:
  https://json-server-astd-1.onrender.com
- Layout desacoplado das features

## 📊 Funcionalidades
- Dashboard com KPIs
- Gráfico de evolução de preços
- Consulta com filtros
- Tela de detalhe do abastecimento
- Breadcrumb no padrão DSGOV

## ♿ Acessibilidade
- Estrutura semântica
- Uso de `aria-label`
- Contraste compatível com DSGOV

## ▶️ Como rodar
```bash
npm install
ng serve
