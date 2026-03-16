# ADR-0005: Autenticação baseada em JWT

Date: 2026-03-15  
Status: Proposed

## Escopo

Autenticação da API

## Contexto

Os serviços precisam de um mecanismo de autenticação para proteger
os endpoints e garantir que apenas clientes autorizados possam
acessar o sistema.

Uma solução stateless é desejável para facilitar escalabilidade.

## Decisão

Adotar autenticação baseada em JSON Web Token (JWT).

O cliente receberá um token após autenticação e deverá enviá-lo
nas requisições subsequentes.

O token será validado pelo API Gateway.

## Consequências

Positivas:

- autenticação stateless
- facilidade de escalabilidade
- amplamente utilizado em APIs modernas

Negativas:

- necessidade de gerenciamento seguro da chave de assinatura
- tokens não podem ser facilmente revogados antes da expiração
