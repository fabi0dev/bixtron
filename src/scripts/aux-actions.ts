import { Subscription, delay, of } from "rxjs";
import { fn } from "../helpers/functions";
import { store } from "../store/store";

const getElement = (el: string): HTMLInputElement => {
  return document.querySelector(el) as HTMLInputElement;
};

const getCore = () => {
  return store.getState().bixtronCore;
};

const contentQueue = <Array<Subscription>>[];

//fila de times
const addQueue = (
  fn: () => void,
  time: number = 0,
  priority: boolean = false
) => {
  if (priority) {
    stopQueue();
  }

  const action = of(null).pipe(delay(time)).subscribe(fn);
  contentQueue.push(action);
  return action;
};

//cancela fila de times
const stopQueue = () => {
  of(...contentQueue).subscribe((action) => {
    (action as Subscription).unsubscribe();
  });
};

//para uma fila insolada ou customizada
const createQueue = () => {
  return {
    list: <Array<Subscription>>[],
    add: function (fn: () => void, time: number) {
      const action = of(null).pipe(delay(time)).subscribe(fn);
      this.list.push(action);
    },
    stop: function () {
      of(...this.list).subscribe((action) => {
        (action as Subscription).unsubscribe();
      });
    },
  };
};

//para subscribe de time out
const subsTime = (fn: () => void, time: number) => {
  return of(null).pipe(delay(time)).subscribe(fn);
};

export const aux = {
  textInteractCurrent: 1,
  textInteractCount: 0,
  textInteractActive: false,
  setTextInteract: (text: string | Array<string>, callback = () => {}) => {
    if (text.constructor == Array) {
      text = text[fn.randomInt(0, text.length)];
    }
    aux.textInteractCount += 1;

    const container = getElement("#robo-container");
    const contentShapeBounding =
      getElement("#content-shape").getBoundingClientRect();
    const id = "textIn-" + aux.textInteractCount;

    container.insertAdjacentHTML(
      "beforeend",
      `<div id="${id}" class="text-interact">${text}</div>`
    );

    const interact = getElement(`#${id}`);
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
        const currentInteract = getElement(
          `[number-interact="${aux.textInteractCurrent}"]`
        );

        if (currentInteract !== null) {
          currentInteract.style.filter = "blur(10px)";

          setTimeout(() => {
            currentInteract.remove();
            currentInteract.style.setProperty("display", "none");

            const newCurrentInteract = getElement(
              `[number-interact="${aux.textInteractCurrent + 1}"]`
            );

            if (newCurrentInteract !== null) {
              newCurrentInteract.style.setProperty("display", "");
            }
            aux.textInteractCurrent += 1;

            callback();
          }, 100);
        }
      });
    }
  },
};

export const pauseAnimation = (elName: string) => {
  getElement(elName).style.setProperty("animation-play-state", "paused");
};

export const playAnimation = (elName: string) => {
  getElement(elName).style.setProperty("animation-play-state", "running");
};

const touchToMouse = (touchEvent: TouchEvent, mouseEvent: string) => {
  try {
    const [touch] = touchEvent.touches.length
      ? touchEvent.touches
      : touchEvent.changedTouches;

    return new MouseEvent(mouseEvent, {
      clientX: touch.clientX,
      clientY: touch.clientY,
      pageX: touch.pageX,
      pageY: touch.pageY,
    });
  } catch (e) {
    return touchEvent;
  }
};

export {
  getElement,
  getCore,
  addQueue,
  stopQueue,
  createQueue,
  subsTime,
  touchToMouse,
};
