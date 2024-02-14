import { bixtronConfig } from "../bixtronconfig";
import { aux } from "../scripts/aux-actions";
import { audioEffects } from "./audio-effects";

export const shapeReactions = {
  init: () => {
    shapeReactions.setConfigs();
    shapeReactions.setMoveByHead();
    audioEffects.init();

    aux.setTextInteract("Olá");
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
  //efeito gravidade
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

    const documentHeight = document.body.clientHeight;
    const floorDefault =
      documentHeight - bixtronConfig.floorPosition - contentShape.clientHeight;

    let timeout = setTimeout(() => {});

    let mousePos = {
      left: 0,
      top: 0,
    };

    const initialPos = {
      left: 0,
      top: 0,
    };

    let timePlayBody = setTimeout(() => {});

    const dragMouseDown = function (e) {
      e.preventDefault();
      // get the mouse cursor position at startup:
      initialPos.left = e.clientX;
      initialPos.top = e.clientY;

      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
      audioEffects.set(["05", "06"], true);
    };

    const elementDrag = function (e) {
      e.preventDefault();

      mousePos = {
        left: initialPos.left - e.clientX,
        top: initialPos.top - e.clientY,
      };

      initialPos.left = e.clientX;
      initialPos.top = e.clientY;

      let newTop = contentShape.offsetTop - mousePos.top;

      if (newTop > floorDefault) {
        newTop = floorDefault;
      } else {
        clearTimeout(timePlayBody);
        if (mousePos.left > 0) {
          //esquerda
          timePlayBody = setTimeout(() => {
            ContentChests.style.transform = "rotate(-10deg) translateY(59px)";
          }, 10);
        } else {
          //direita
          timePlayBody = setTimeout(() => {
            ContentChests.style.transform = `rotateZ(10deg)`;
          }, 10);
        }
      }

      contentShape.style.left = contentShape.offsetLeft - mousePos.left + "px";

      contentShape.style.top = `${newTop}px`;

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
        shapeReactions.effectGravity();
      }, 100);
    };

    head.onmousedown = dragMouseDown;
  },
};
