import { fn } from "../helpers/functions";
import { aux } from "./aux-actions";

export const audioEffects = {
  initialized: false,
  init: () => {
    if (!audioEffects.initialized) {
      const audio = new Audio("/src/assets/sound/effects/empty.mp3");
      aux.getElement("#content-robot").addEventListener("mousedown", () => {
        if (!audioEffects.initialized) {
          audioEffects.initialized = true;
          audio.play();
        }
      });
    }
  },
  set: (id: string | Array<string>, randomPlay = false) => {
    if (id.constructor === Array) {
      const posRandom = fn.randomInt(0, id.length);
      id = id[posRandom];
    }
    const audio = new Audio(`/src/assets/sound/effects/${id}.mp3`);
    if (!randomPlay || fn.randomInt(0, 2) == 1) {
      audio.play();
    }
  },
};
