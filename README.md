# Frontend Fincycle

![React](https://img.shields.io/badge/react-20232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Docker](https://img.shields.io/badge/docker-0db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![MUI](https://img.shields.io/badge/mui-0081CB.svg?style=for-the-badge&logo=mui&logoColor=white)

_Este repositório faz parte do projeto [Sistema de pagamentos Fincycle](https://github.com/jvcalassio/fc-payment-system)_

Este serviço é responsável por apresentar a interface com o usuário em uma página web, interagindo com o backend através da API REST disponibilizada.

É possível criar uma conta/fazer login, e cada conta é responsável por suas ordens de pagamento. É possível consultar as ordens existentes, assim como os status atualizados em tempo real, além de criar novas ordens.

## Interface

Para o desenvolvimento da interface foi utilizada a biblioteca [Material UI (MUI)](https://mui.com/), que disponibiliza diversos componentes com um estilo de design próprio. Isso permitiu um desenvolvimento rápido e sem preocupações com esquema visual.

## API e Server Side Rendering

A aplicação possui uma API interna utilizada por todas as páginas. Essa API funciona como um middleware, habilitando o cookie de conta em qualquer página mesmo sendo renderizada do lado do servidor.

## Execução

Para o correto funcionamento do serviço, é necessário que o Apache Kafka esteja devidamente configurado e em execução.

Assim, é recomendável seguir as [instruções do repositório principal](https://github.com/jvcalassio/fc-payment-system#execu%C3%A7%C3%A3o-em-desenvolvimento).

Caso queira executar apenas este serviço, basta clonar o repositório e utilizar o docker compose:

```
docker-compose up -d --build
```

A aplicação estará disponível em http://localhost:3001/ (ou http://host.docker.internal:3001/).
