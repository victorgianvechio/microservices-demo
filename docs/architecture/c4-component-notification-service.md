# C4 - Component Diagram - Notification Service

Este diagrama mostra os componentes internos do microsserviço
Payment Service e como eles se relacionam.

O objetivo é explicar a organização interna do serviço.

```mermaid
flowchart LR

RabbitMQ[(RabbitMQ<br>Message Broker)]

subgraph PaymentService["Payment Service"]

    Consumer["Order Created Consumer"]

    Service["Payment Service"]

    Publisher["Payment Approved Publisher"]

end

RabbitMQ -->|order_created<br>+ correlationId| Consumer
Consumer --> Service
Service --> Publisher
Publisher -->|payment_approved<br>+ correlationId| RabbitMQ
```
