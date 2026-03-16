# C4 - Component Diagram - Order Service

Este diagrama mostra os componentes internos do microsserviço
Order Service e como eles se relacionam.

O objetivo é explicar a organização interna do serviço.

```mermaid
flowchart LR

Client[API Service]

Rabbit[(RabbitMQ)]
DB[(Order Database)]

subgraph Order Service

Controller[Order Controller]

Service[Order Service]

Repository[Order Repository]

Publisher[Order Event Publisher]

end

Client --> Controller
Controller --> Service

Service --> Repository
Repository --> DB

Service --> Publisher
Publisher -->|OrderCreated| Rabbit
```
