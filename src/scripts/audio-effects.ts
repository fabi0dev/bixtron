import { fromEvent, merge } from "rxjs";
import { take } from "rxjs/operators";
import { fn } from "../helpers/functions";
import { getElement } from "./aux-actions";

const audioCache = new Map<string, HTMLAudioElement[]>();
const POOL_SIZE = 3;

const preloadAudio = (src: string): HTMLAudioElement => {
  const audio = new Audio(src);
  audio.preload = "auto";
  audio.load();
  return audio;
};

const getAudioFromPool = (id: string): HTMLAudioElement => {
  const src = `/assets/sound/effects/${id}.mp3`;

  if (!audioCache.has(id)) {
    const pool = Array.from({ length: POOL_SIZE }, () => preloadAudio(src));
    audioCache.set(id, pool);
  }

  const pool = audioCache.get(id)!;
  const available = pool.find((a) => a.paused || a.ended);

  if (available) {
    available.currentTime = 0;
    return available;
  }

  return preloadAudio(src);
};

export const audioEffects = {
  initialized: false,

  init: () => {
    if (audioEffects.initialized) return;

    const robot = getElement("#content-robot");
    if (!robot) return;

    merge(
      fromEvent(robot, "mousedown"),
      fromEvent(robot, "touchstart"),
      fromEvent(document, "click"),
      fromEvent(document, "touchstart")
    )
      .pipe(take(1))
      .subscribe(() => {
        audioEffects.initialized = true;
        const unlock = new Audio("/assets/sound/effects/empty.mp3");
        unlock.volume = 0.01;
        unlock.play().catch(() => {});
      });
  },

  set: (id: string | Array<string>, randomPlay = false) => {
    if (id.constructor === Array) {
      id = id[fn.randomInt(0, id.length)];
    }

    if (randomPlay && fn.randomInt(0, 2) !== 1) return;

    const audio = getAudioFromPool(id as string);
    audio.play().catch(() => {});
  },
};
