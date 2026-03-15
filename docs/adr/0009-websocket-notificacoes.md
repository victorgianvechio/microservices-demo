# ADR-0009: Uso de WebSocket para notificações em tempo real

Date: 2026-03-15  
Status: Accepted

## Escopo

Sistema de notificações

## Contexto

Algumas operações do sistema, como processamento de pedidos e
pagamentos, podem ocorrer de forma assíncrona.

O cliente precisa ser informado quando determinados eventos ocorrem,
como conclusão de pagamento ou processamento de pedidos.

Utilizar apenas requisições HTTP exigiria que o cliente realizasse
consultas frequentes (polling) para verificar atualizações.

## Decisão

Utilizar WebSocket para enviar notificações em tempo real aos clientes.

O notification-service será responsável por consumir eventos do
RabbitMQ e transmitir notificações para os clientes conectados
via WebSocket.

## Aplica-se a

- notification-service
- frontend

## Consequências

Positivas:

- notificações em tempo real
- redução de requisições HTTP desnecessárias
- melhor experiência para o usuário

Negativas:

- necessidade de gerenciamento de conexões WebSocket
- maior complexidade no serviço de notificações
