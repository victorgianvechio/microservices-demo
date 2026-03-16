# C4 - Container Diagram

Este diagrama mostra os principais containers do sistema e como eles se comunicam.

```mermaid
flowchart LR

User((Usuário))

PaymentExt[[Pagamento<br>Sistema Externo]]

subgraph Sistema de Processamento de Pedidos

Frontend[Frontend<br>Vue3 + Quasar]

APISvc[API Service<br>Node.js + Express]

OrderSvc[Order Service<br>Node.js Worker]

Rabbit[(RabbitMQ<br>Message Broker)]

PaymentSvc[Payment Service<br>Node.js Worker]

NotificationSvc[Notification Service<br>WebSocket Server]

end

User --> Frontend

Frontend -->|HTTP| APISvc

APISvc --> OrderSvc

OrderSvc -->|OrderCreated| Rabbit
PaymentSvc -->|PaymentApproved| Rabbit

Rabbit -->|OrderCreated| PaymentSvc
Rabbit -->|PaymentApproved| NotificationSvc

Frontend <-->|WebSocket| NotificationSvc

PaymentSvc --> PaymentExt
```
