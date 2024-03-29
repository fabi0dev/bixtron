import { fromEvent, map, race } from "rxjs";
import { fn } from "../../../helpers/functions";
import { getElement, touchToMouse } from "../../../scripts/aux-actions";

export const toAccompanyMouse = () => {
  //parte de fechar os olhos
  const initialOpenEyes = 4;

  const closeEyes = () => {
    setTimeout(() => {
      const eyes = document.querySelectorAll(".eyes");
      [...eyes].map((eye) => {
        eye?.setAttribute("ry", "0%");
      });

      setTimeout(() => {
        [...eyes].map((eye) => {
          eye?.setAttribute("ry", initialOpenEyes + "%");
        });
      }, 500);

      closeEyes();
    }, fn.randomInt(3, 10) * 1000);
  };

  closeEyes();
  //--

  race(
    fromEvent(document, "mousemove"),
    fromEvent(document, "touchmove").pipe(
      map((e) => touchToMouse(e as TouchEvent, "touchmove"))
    )
  ).subscribe((e) => {
    const event = e as MouseEvent;
    const contentShape = getElement("#content-shape");
    const contentEyes = getElement("#content-eyes");
    const headBounding = contentShape.getBoundingClientRect();
    const minDistance = 100;
    const maxDistance = 150;

    const contentShapePos = {
      top: headBounding.top + minDistance,
      left: headBounding.left + minDistance,
      right: headBounding.right + minDistance,
      bottom: headBounding.bottom + minDistance,
      height: headBounding.height,
    };

    const pagePos = {
      x: event.pageX + minDistance,
      y: event.pageY + minDistance,
      right: window.innerWidth - minDistance,
    };

    const translateEyes = {
      y: 80,
      x: 4,
    };

    if (
      maxDistance < pagePos.x &&
      pagePos.x < pagePos.right &&
      maxDistance < pagePos.y
    ) {
      //se estiver acima do corpo
      if (contentShapePos.top > pagePos.y) {
        translateEyes.y = 65;
      } else if (contentShapePos.bottom < pagePos.y) {
        //se tiver abaixo do corpo
        translateEyes.y = 95;
      }

      if (contentShapePos.left > pagePos.x) {
        translateEyes.x = -8;
      } else if (contentShapePos.right < pagePos.x) {
        translateEyes.x = 12;
      }
    }

    if (contentEyes != null) {
      contentEyes.style.transform = `translateY(${translateEyes.y}px) translateX(${translateEyes.x}px)`;
    }
  });
};
