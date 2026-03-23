# C4 - Component Diagram - Order Service

Este diagrama mostra os componentes internos do microsserviço
Order Service e como eles se relacionam.

O objetivo é explicar a organização interna do serviço.

```mermaid
flowchart LR

APIGateway[API Gateway]

Rabbit[(RabbitMQ<br>Message Broker)]

DB[(Order Database<br>PostgreSQL)]

subgraph Order Service

Controller[Order Controller]

Service[Order Service]

Repository[Order Repository]

Publisher[Order Event Publisher]

end

APIGateway --> Controller
Controller --> Service

Service --> Repository
Repository --> DB

Service --> Publisher
Publisher -->|OrderCreated| Rabbit
```
