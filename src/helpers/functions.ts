export const fn = {
  randomInt: (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
  },
  //pode ou não executar
};

const execRandom = (call: () => void, noCall?: () => void) => {
  if (fn.randomInt(0, 3) == 1) {
    call();
  } else {
    if (typeof noCall == "function") {
      noCall();
    }
  }
};

export { execRandom };
