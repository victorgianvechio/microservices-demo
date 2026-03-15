# C4 - Component Diagram - Order Service

Este diagrama mostra os componentes internos do microsserviço
Order Service e como eles se relacionam.

O objetivo é explicar a organização interna do serviço.

```mermaid
flowchart LR

Client[API Service]

Controller[Order Controller<br>Express Route]

Service[Order Service<br>Business Logic]

Publisher[Order Event Publisher]

Rabbit[(RabbitMQ)]

Client --> Controller

Controller --> Service

Service --> Publisher

Publisher --> Rabbit
```
