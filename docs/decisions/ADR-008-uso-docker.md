# ADR-0008: Uso de Docker para ambiente de desenvolvimento

Date: 2026-03-15  
Status: Accepted

## Escopo

Ambiente de desenvolvimento e execução dos serviços

## Contexto

O sistema possui múltiplos serviços que dependem de diferentes
configurações e componentes externos, como o broker de mensagens.

Configurar manualmente cada serviço no ambiente de desenvolvimento
poderia gerar inconsistências entre máquinas e dificultar a execução
do sistema.

## Decisão

Utilizar Docker para executar todos os serviços da aplicação em containers.

Cada microsserviço possui seu próprio Dockerfile e o ambiente completo
é orquestrado utilizando docker-compose.

Isso permite iniciar todo o sistema com um único comando.

## Consequências

Positivas:

- padronização do ambiente de execução
- facilidade para iniciar o sistema completo
- isolamento entre serviços

Negativas:

- necessidade de conhecimento adicional sobre Docker
- maior consumo de recursos no ambiente local
