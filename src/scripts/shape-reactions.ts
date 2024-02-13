export const shapeReactions = {
  init: () => {
    console.log("iniciou");
    shapeReactions.setMoveByHead();
  },
  effectGravity: () => {},
  //arrastar corpo pela cabeça
  setMoveByHead: () => {
    const head = document.querySelector("#head");
    const contentShape = document.querySelector("#content-shape");
    const ContentChests = document.querySelector("#ContentChests");
    let timeout = setTimeout(() => {});

    let mousePos = {
      left: 0,
      top: 0,
    };

    const initialPos = {
      left: 0,
      top: 0,
    };

    let initialPosFixed = {
      left: 0,
      top: 0,
    };

    const dragMouseDown = function (e) {
      e.preventDefault();
      // get the mouse cursor position at startup:
      initialPos.left = e.clientX;
      initialPos.top = e.clientY;

      initialPosFixed = {
        left: e.clientX,
        top: e.clientY,
      };

      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    };

    const elementDrag = function (e) {
      e.preventDefault();

      mousePos = {
        left: initialPos.left - e.clientX,
        top: initialPos.top - e.clientY,
      };

      initialPos.left = e.clientX;
      initialPos.top = e.clientY;

      if (mousePos.left > 0) {
        //esquerda
        ContentChests.style.transform = "rotate(-10deg) translateY(59px)";
      } else {
        //direita
        ContentChests.style.transform = `rotateZ(10deg)`;
      }

      contentShape.style.left = contentShape.offsetLeft - mousePos.left + "px";

      contentShape.style.top = contentShape.offsetTop - mousePos.top + "px";

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        ContentChests.style.transform = "";
      }, 100);
    };

    const closeDragElement = () => {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    };

    head.onmousedown = dragMouseDown;
  },
};
