import { bixtronConfig } from "../bixtronconfig";

export const shapeReactions = {
  init: () => {
    console.log("iniciou");
    shapeReactions.setConfigs();
    shapeReactions.setMoveByHead();
  },

  setConfigs: () => {
    const contentShape = document.querySelector(
      "#content-shape"
    ) as HTMLInputElement;
    const documentHeight = document.body.clientHeight;

    //definindo o chão dele, não pode descer mais que isso
    contentShape.style.top = `${
      documentHeight - bixtronConfig.floorPosition - contentShape.clientHeight
    }px`;
  },
  effectGravity: () => {
    const contentShape = document.querySelector(
      "#content-shape"
    ) as HTMLInputElement;

    const documentHeight = document.body.clientHeight;
    const contentRobotPos = contentShape.getBoundingClientRect();
    const floorDefault =
      documentHeight - bixtronConfig.floorPosition - contentShape.clientHeight;

    let newFloor = contentRobotPos.y + bixtronConfig.gravity;

    if (contentRobotPos.y <= floorDefault) {
      contentShape.style.top = `${newFloor}px`;
    } else {
      if (newFloor > floorDefault) {
        newFloor = floorDefault;
      }

      contentShape.style.top = `${newFloor}px`;

      return;
    }

    setTimeout(shapeReactions.effectGravity, 0);
  },
  //arrastar corpo pela cabeça
  setMoveByHead: () => {
    const head = document.querySelector("#head") as HTMLInputElement;

    const contentShape = document.querySelector(
      "#content-shape"
    ) as HTMLInputElement;
    const ContentChests = document.querySelector(
      "#ContentChests"
    ) as HTMLInputElement;

    let timeout = setTimeout(() => {});

    let mousePos = {
      left: 0,
      top: 0,
    };

    const initialPos = {
      left: 0,
      top: 0,
    };

    const dragMouseDown = function (e) {
      e.preventDefault();
      // get the mouse cursor position at startup:
      initialPos.left = e.clientX;
      initialPos.top = e.clientY;

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

      setTimeout(() => {
        console.log("finalizou");
        shapeReactions.effectGravity();
      }, 100);
    };

    head.onmousedown = dragMouseDown;
  },
};
