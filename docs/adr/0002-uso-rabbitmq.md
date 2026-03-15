# ADR-0002: Uso do RabbitMQ para mensageria assíncrona

Date: 2026-03-15  
Status: Accepted

## Escopo

Sistema inteiro

## Contexto

O sistema é composto por múltiplos microsserviços que precisam se comunicar
de forma assíncrona sem criar forte acoplamento entre eles.

## Decisão

Adotar o RabbitMQ como broker de mensagens para comunicação entre os serviços.

## Consequências

Positivas:

- serviços desacoplados
- arquitetura mais escalável

Negativas:

- aumento da complexidade operacional
