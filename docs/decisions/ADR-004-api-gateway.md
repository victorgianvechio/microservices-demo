# ADR-0004: Introdução de um API Gateway

Date: 2026-03-15  
Status: Proposed

## Escopo

Camada de entrada da API

## Contexto

Atualmente os clientes acessam diretamente os serviços da aplicação.
Isso pode gerar problemas como:

- múltiplos pontos de entrada
- dificuldade em centralizar autenticação
- ausência de controle de rate limiting

## Decisão

Introduzir um API Gateway responsável por:

- centralizar o acesso às APIs
- gerenciar autenticação
- aplicar rate limiting
- rotear requisições para os serviços internos

O gateway será implementado inicialmente utilizando Node.js com Express.

## Consequências

Positivas:

- ponto único de entrada para o sistema
- centralização de autenticação
- maior controle sobre requisições externas

Negativas:

- adição de mais um componente na arquitetura
- necessidade de manter e monitorar o gateway
