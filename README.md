# ponderada-criptografia-didatica

Repositório para desenvolvermos a ponderada de criptografia com visualização didática.

Grupo: Ana Goes, Gabriel Coletto, Gabriel Farias, Mauro das Chagas Junior

## O que é este projeto

Este projeto é uma aplicação web educacional que ensina algoritmos de criptografia de forma visual e interativa. Cada algoritmo tem sua própria página com explicações e uma interface para testar como funciona.

## Estrutura do projeto

```
src/
├── cyphers/     # Implementações dos algoritmos de criptografia
└── view/        # Aplicação React (frontend)
```

## Como rodar o frontend

1. Entre na pasta do frontend:
```bash
cd src/view
```

2. Instale as dependências:
```bash
npm install
```

3. Rode o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse no navegador o endereço que aparecer no terminal (geralmente http://localhost:5173)

## Como fazer deploy

1. Entre na pasta do frontend:
```bash
cd src/view
```

2. Gere a build de produção:
```bash
npm run build
```

3. A pasta `dist/` será criada com os arquivos prontos para deploy. Você pode fazer upload direto no Netlify ou configurar deploy automático.

## Cifras implementadas

- Cifra de Atbash: Substituição inversa do alfabeto (A vira Z, B vira Y, etc.)
