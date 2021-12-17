# Frontend Fincycle

![TypeScript](https://img.shields.io/badge/typescript-007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Docker](https://img.shields.io/badge/docker-0db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

_Este repositório faz parte do projeto [Sistema de pagamentos Fincycle](https://github.com/jvcalassio/fc-payment-system)_

# TODO SPEC

TODO

## Execução

Para o correto funcionamento do serviço, é necessário que o Apache Kafka esteja devidamente configurado e em execução.

Assim, é recomendável seguir as [instruções do repositório principal](https://github.com/jvcalassio/fc-payment-system#execu%C3%A7%C3%A3o-em-desenvolvimento).

Caso queira executar apenas este serviço, basta clonar o repositório e utilizar o docker compose:

```
docker-compose up -d --build
```

A API estará disponível em http://localhost:3001/ (ou http://host.docker.internal:3001/).
