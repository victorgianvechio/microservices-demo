# C4 - Component Diagram - Order Service

Este diagrama mostra os componentes internos do microsserviço
Order Service e como eles se relacionam.

O objetivo é explicar a organização interna do serviço.

```mermaid
flowchart LR

Client[API Service]

subgraph Order Service

OrderController[Order Controller<br>Express Route]

OrderService[Order Service<br>Business Logic]

OrderEventPublisher[Order Event Publisher]

end

Rabbit[(RabbitMQ<br>Message Broker)]

Client --> OrderController
OrderController --> OrderService
OrderService --> OrderEventPublisher
OrderEventPublisher -->|OrderCreated| Rabbit
```
