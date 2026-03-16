# ADR-0006: Uso do padrão Circuit Breaker para resiliência

Date: 2026-03-15  
Status: Proposed

## Escopo

Comunicação entre serviços

## Contexto

Em sistemas distribuídos, falhas de rede ou indisponibilidade de
serviços podem causar cascatas de falhas e impactar todo o sistema.

É necessário implementar mecanismos de resiliência para lidar
com falhas temporárias.

## Decisão

Adotar o padrão Circuit Breaker para proteger chamadas entre serviços.

Além disso, serão utilizados mecanismos adicionais:

- retry com limite de tentativas
- timeout para chamadas externas
- bulkhead para isolamento de recursos

## Consequências

Positivas:

- maior resiliência do sistema
- prevenção de falhas em cascata
- melhor controle de chamadas entre serviços

Negativas:

- aumento da complexidade de implementação
- necessidade de configuração e monitoramento dos circuitos
