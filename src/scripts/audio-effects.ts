import { fromEvent, race } from "rxjs";
import { fn } from "../helpers/functions";
import { getElement } from "./aux-actions";

export const audioEffects = {
  initialized: false,
  init: () => {
    if (!audioEffects.initialized) {
      const audio = new Audio("/assets/sound/effects/empty.mp3");
      race(
        fromEvent(getElement("#content-robot"), "mousedown"),
        fromEvent(getElement("#content-robot"), "touchstart")
      ).subscribe(() => {
        if (!audioEffects.initialized) {
          audioEffects.initialized = true;
          audio.play();
        }
      });
    }
  },
  set: (id: string | Array<string>, randomPlay = false) => {
    if (id.constructor === Array) {
      id = id[fn.randomInt(0, id.length)];
    }
    const audio = new Audio(`/assets/sound/effects/${id}.mp3`);
    if (!randomPlay || (randomPlay && fn.randomInt(0, 2) == 1)) {
      audio.play();
    }
  },
};
