# ADR-0001: Adoção de Arquitetura de Microsserviços

Date: 2026-03-15  
Status: Accepted

## Escopo

Sistema inteiro

## Contexto

O sistema precisa ser desenvolvido de forma modular, permitindo que diferentes
funcionalidades evoluam de maneira independente.

Uma arquitetura monolítica poderia dificultar a escalabilidade, a manutenção
e a evolução independente dos componentes do sistema.

## Decisão

Adotar uma arquitetura baseada em microsserviços, separando as responsabilidades
do sistema em serviços independentes.

Os principais serviços definidos são:

- api-gateway
- order-service
- payment-service
- notification-service

Cada serviço possui sua própria lógica de negócio e se comunica com os demais
por meio de mensageria assíncrona.

## Consequências

Positivas:

- maior desacoplamento entre componentes
- possibilidade de escalar serviços de forma independente
- maior flexibilidade de evolução do sistema

Negativas:

- aumento da complexidade operacional
- necessidade de gerenciamento de comunicação entre serviços
