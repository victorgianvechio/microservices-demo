# ADR-0003: Adoção de Arquitetura Orientada a Eventos

Date: 2026-03-15  
Status: Accepted

## Escopo

Sistema inteiro

## Contexto

Em uma arquitetura de microsserviços, a comunicação direta entre serviços
pode gerar forte acoplamento e dificultar a escalabilidade do sistema.

Além disso, algumas operações do sistema podem ser processadas de forma
assíncrona.

## Decisão

Adotar uma arquitetura orientada a eventos (Event-Driven Architecture),
na qual os serviços publicam eventos e outros serviços podem consumi-los.

Exemplos de eventos no sistema:

- order.created
- order.validated
- payment.completed

Os eventos são publicados através do RabbitMQ.

## Consequências

Positivas:

- baixo acoplamento entre serviços
- maior escalabilidade
- possibilidade de processamento assíncrono

Negativas:

- maior complexidade no rastreamento de fluxos
- necessidade de monitoramento da mensageria
