export const fn = {
  randomInt: (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
  },
  //pode ou não executar
  execRandom: (call: () => void) => {
    if (fn.randomInt(0, 3) == 1) {
      call();
    }
  },
};
