# App Móvel do Projeto Maia (Protótipo Android) 🦉

![Status](https://img.shields.io/badge/status-protótipo_MVP-blue)
![Tecnologia](https://img.shields.io/badge/tecnologia-React_Native-blueviolet)

Este é o repositório do protótipo do aplicativo móvel (Android) para o Projeto Maia, desenvolvido em **React Native com Expo e TypeScript** durante o hackathon da Campus Party.

## 📝 Sobre o Projeto

Este aplicativo faz parte do ecossistema **Maia**, uma plataforma de apoio e educação para a segurança da mulher. Ele consome a mesma API RESTful que a nossa aplicação web principal, demonstrando a flexibilidade e a escalabilidade da nossa arquitetura de backend.

O principal objetivo deste protótipo, desenvolvido em menos de 24 horas, foi provar que nossa infraestrutura de backend está pronta para servir múltiplas plataformas (web e mobile) de forma coesa e eficiente.

## ✨ Funcionalidades do Protótipo

- **Jornada de Quiz Guiada:** Implementação do fluxo completo de quiz, desde a tela de introdução, passando pelas perguntas paginadas, até a tela de resultados.
- **Lógica de Resultados:** A tela final analisa as respostas para apresentar uma mensagem de apoio e recomendações adequadas.
- **Navegação Nativa:** Uso do React Navigation para criar uma experiência de navegação fluida entre as telas.
- **Consumo de API Real:** Todas as perguntas e dados são buscados em tempo real da nossa API NestJS.

## 🚀 Tecnologias Utilizadas

- **[React Native](https://reactnative.dev/):** Framework para construção de apps nativos com JavaScript e React.
- **[Expo (Managed Workflow)](https://expo.dev/):** Plataforma e conjunto de ferramentas que abstraem a complexidade do desenvolvimento nativo.
- **[TypeScript](https://www.typescriptlang.org/):** Para um código mais seguro, tipado e de fácil manutenção.
- **[React Navigation](https://reactnavigation.org/):** Para o gerenciamento de rotas e navegação entre telas.
- **[Axios](https://axios-http.com/):** Para realizar as chamadas HTTP para a nossa API.

## 🏁 Como Começar

Siga os passos abaixo para executar o aplicativo em seu ambiente de desenvolvimento.

#### **Pré-requisitos**

- Node.js e npm instalados.
- App **Expo Go** instalado no seu celular Android a partir da Play Store.

#### **Instalação e Execução**

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/Projeto-Maia/Maia-mobile.git
    cd maia-mobile
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento do Expo:**

    ```bash
    npm start
    ```

    _ou_

    ```bash
    expo start
    ```

4.  **Abra no seu celular:**
    - Certifique-se de que seu celular e seu computador estão na **mesma rede Wi-Fi**.
    - Abra o app **Expo Go** no seu celular.
    - Escaneie o **QR Code** que apareceu no terminal do seu computador.
    - O aplicativo Maia será carregado no seu celular.

## 🖼️ Screenshots

|                   Tela Inicial                    |                   Tela do Quiz                    |                   Tela de Resultados                    |
| :-----------------------------------------------: | :-----------------------------------------------: | :-----------------------------------------------------: |
| ![Tela Inicial](https://i.imgur.com/d4S0H1B.jpeg) | ![Tela do Quiz](https://i.imgur.com/4oB4OrD.jpeg) | ![Tela de Resultados](https://i.imgur.com/PrOxSaK.jpeg) |

## 🧑‍💻 Equipe

- **Arthur** - Backend Developer
- **Erick** - Frontend Developer
- **Lara** - UX Designer
