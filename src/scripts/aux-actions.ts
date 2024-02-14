import { fn } from "../helpers/functions";
import audio from "./../assets/audios/success.mp3";

export const aux = {
  getElement: (el: string): HTMLInputElement => {
    return document.querySelector(el) as HTMLInputElement;
  },
  textInteractCurrent: 1,
  textInteractCount: 0,
  textInteractActive: false,
  setTextInteract: (text: string) => {
    aux.textInteractCount += 1;

    const container = aux.getElement("#robo-container");
    const contentShapeBounding = aux
      .getElement("#content-shape")
      .getBoundingClientRect();
    const id = "textIn-" + aux.textInteractCount;

    container.insertAdjacentHTML(
      "beforeend",
      `<div id="${id}" class="text-interact">${text}</div>`
    );

    const interact = aux.getElement(`#${id}`);
    interact.setAttribute("number-interact", `${aux.textInteractCount}`);

    const pos = {
      left:
        contentShapeBounding.left - interact.getBoundingClientRect().width / 3,
      right:
        contentShapeBounding.right - interact.getBoundingClientRect().width / 2,
      top:
        contentShapeBounding.top - interact.getBoundingClientRect().height / 2,
    };

    interact.style.cssText = `left: ${
      pos[fn.randomInt(1, 3) > 1 ? "right" : "left"]
    }px; top: ${pos.top}px; `;
    interact.style.setProperty("display", "none");

    if (aux.textInteractCount == aux.textInteractCurrent) {
      interact.style.setProperty("display", "");
    }

    if (!aux.textInteractActive) {
      aux.textInteractActive = true;

      window.addEventListener("mousedown", () => {
        const currentInteract = aux.getElement(
          `[number-interact="${aux.textInteractCurrent}"]`
        );

        if (currentInteract !== null) {
          currentInteract.style.filter = "blur(10px)";

          setTimeout(() => {
            currentInteract.remove();
            currentInteract.style.setProperty("display", "none");

            const newCurrentInteract = aux.getElement(
              `[number-interact="${aux.textInteractCurrent + 1}"]`
            );

            if (newCurrentInteract !== null) {
              newCurrentInteract.style.setProperty("display", "");
            }
            aux.textInteractCurrent += 1;
          }, 100);
        }
      });
    }
  },
};
