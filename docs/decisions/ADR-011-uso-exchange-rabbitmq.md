# ADR-0011: Uso de Exchange no RabbitMQ para distribuição de logs

Date: 2026-03-23  
Status: Accepted

## Escopo

Sistema inteiro

## Contexto

Atualmente, o sistema utiliza filas (queues) no RabbitMQ para comunicação entre
microsserviços.

Com o crescimento do sistema, surgiu a necessidade de implementar um serviço
centralizado de logs, capaz de:

- receber logs de múltiplos serviços
- processar e armazenar logs de forma desacoplada
- permitir que múltiplos consumidores utilizem os mesmos eventos de log

O uso de filas diretas (queue) limita o consumo, pois cada mensagem é consumida
por apenas um consumidor, dificultando a distribuição de logs para múltiplos
destinos simultaneamente.

## Decisão

Adotar o uso de **exchange** no RabbitMQ para o envio de logs, em vez de envio
direto para filas.

Os serviços passarão a publicar logs em uma exchange (do tipo `topic` ou `fanout`),
permitindo que múltiplas filas consumam os mesmos eventos.

O serviço de logs será responsável por:

- criar filas específicas para processamento de logs
- consumir mensagens da exchange
- processar e armazenar logs (ex: banco, observabilidade, arquivos)

## Aplica-se a

- api-gateway
- order-service
- payment-service
- notification-service
- log-service

## Consequências

Positivas:

- maior flexibilidade na distribuição de mensagens
- possibilidade de múltiplos consumidores para o mesmo evento
- desacoplamento entre produtores e consumidores de logs
- melhor escalabilidade do sistema de logs
- suporte a diferentes tipos de processamento de logs (armazenamento, análise, monitoramento)

Negativas:

- maior complexidade na configuração do RabbitMQ
- necessidade de definir e gerenciar exchanges, bindings e routing keys
- aumento da responsabilidade na configuração de mensageria
