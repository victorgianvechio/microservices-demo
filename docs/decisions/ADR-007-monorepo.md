# ADR-0007: Uso de Monorepo para organização dos serviços

Date: 2026-03-15  
Status: Accepted

## Escopo

Repositório do sistema

## Contexto

O sistema é composto por múltiplos microsserviços que precisam ser
desenvolvidos e evoluídos de forma coordenada.

Manter cada serviço em um repositório separado poderia aumentar a
complexidade de gerenciamento, dificultar mudanças que afetam múltiplos
serviços e tornar o ambiente de desenvolvimento mais complexo.

## Decisão

Adotar a estratégia de monorepo, mantendo todos os serviços do sistema
em um único repositório.

Cada microsserviço possui seu próprio diretório dentro do repositório,
permitindo separação lógica enquanto mantém uma visão unificada do sistema.

Estrutura simplificada do repositório:

- api-gateway
- order-service
- payment-service
- notification-service
- frontend

## Consequências

Positivas:

- simplificação do gerenciamento do projeto
- facilidade para alterações que envolvem múltiplos serviços
- ambiente de desenvolvimento mais simples
- visão centralizada da arquitetura

Negativas:

- aumento do tamanho do repositório
- necessidade de organização clara da estrutura de pastas
