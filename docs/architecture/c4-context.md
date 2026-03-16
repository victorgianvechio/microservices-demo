# C4 - Context Diagram

Este diagrama mostra como os usuários interagem com o sistema e quais
sistemas externos estão envolvidos.

O objetivo deste diagrama é apresentar a visão de mais alto nível da
arquitetura, sem detalhar os microsserviços internos.

```mermaid
flowchart LR

User((Usuário))

Frontend[Aplicação Web]

System[Sistema de Processamento de Pedidos]

PaymentExt[[Pagamento<br>Sistema Externo]]

User --> Frontend

Frontend --> System

System --> PaymentExt
```
