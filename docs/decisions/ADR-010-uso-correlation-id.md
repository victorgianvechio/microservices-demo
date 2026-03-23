# ADR-0010: Uso de Correlation ID para rastreamento de requisições

Date: 2026-03-22  
Status: Accepted

## Escopo

Sistema inteiro

## Contexto

O sistema é composto por múltiplos microsserviços que se comunicam de forma
assíncrona através de mensageria.

Uma única ação do usuário pode gerar uma cadeia de eventos passando por diversos
serviços, como:

- criação de pedido
- processamento de pagamento
- envio de notificação

Sem um mecanismo de rastreamento, torna-se difícil identificar:

- o fluxo completo de uma requisição
- a origem de erros
- o caminho percorrido por um evento

Isso dificulta debugging, observabilidade e monitoramento do sistema.

## Decisão

Adotar o uso de Correlation ID para rastrear requisições ao longo de todo o sistema.

Um identificador único será gerado no início da requisição no API Gateway
e será propagado entre os serviços.

O Correlation ID será:

- criado com a biblioteca _crypto_ do Node
- incluído nos headers das requisições HTTP
- incluído nas mensagens publicadas no RabbitMQ
- utilizado nos logs de todos os serviços

## Aplica-se a

- api-gateway
- order-service
- payment-service
- notification-service

## Consequências

Positivas:

- rastreamento completo do fluxo de requisições
- facilidade para debugging em sistemas distribuídos
- melhor observabilidade e monitoramento
- integração facilitada com ferramentas de logging e tracing

Negativas:

- necessidade de padronização e propagação do ID entre serviços
- pequeno aumento na complexidade de implementação
