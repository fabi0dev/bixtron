# Bixtron

Um projeto divertido de um robozinho animado desenvolvido com HTML, SVG, CSS, JavaScript. O robozinho é interativo e permite pequenas interações e retorna algumas expressões e sons. Além disso, é possível personalizar as cores do corpo e dos olhos para customizar o robozinho. Eu o criei para testar o [RxJS](https://rxjs.dev/guide/overview), que é uma biblioteca para programação reativa usando JavaScript. A programação reativa é um paradigma de programação assíncrona que se baseia na propagação de mudanças. Em vez de lidar com eventos isolados, a programação reativa permite que você trabalhe com sequências de eventos ao longo do tempo. Ou seja não precisei fazer um monte de `setTimeout`,`setInterval` ou `if's` quando se interage com o robô.

<div>
  <img alt="img-1" src="https://i.imgur.com/1UM4o4P.gif" />
</div>

## Funcionalidades

- **Design Legal:** Corpo arredondado e animações suaves tornam o robozinho visualmente agradável.
- **Mover:** Pode-se mover ele para qualquer lugar arrastando-o pela cabeça.
- **Braços:** Os usuários podem interagir arrastando os braços do robozinho como se fosse um braço real.
- **Personalização de Cores:** Adapte o robozinho ao seu estilo alterando facilmente as cores do corpo e dos olhos.

## Tecnologias Utilizadas

- **Vite:** Ferramenta de construção rápida e intuitiva para projetos JavaScript e TypeScript.
- **RxJS:** Promove a reatividade no código, o que significa que ele pode responder automaticamente a mudanças nos dados, eventos ou estado da aplicação.

## Personalização de Cores

Para personalizar as cores, basta modificar as configurações que estão sempre disponíveis através do botão localizado a parte superior direita.

<div>
  <img alt="img-1" width="400px" height="350px" src="https://i.imgur.com/1pV05Xn.png" />
  <img alt="img-1" width="400px" height="350px" src="https://i.imgur.com/fAGWFvv.png" />

</div>

### Como testar

1. Clone o código
2. Instale as dependências: `npm install` ou `yarn install`
3. Inicie a aplicação: `npm dev` ou `yarn dev`
