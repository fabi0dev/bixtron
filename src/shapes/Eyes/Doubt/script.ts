import { audioEffects } from "../../../scripts/audio-effects";
import { addQueue, getElement } from "../../../scripts/aux-actions";
import { setEye } from "../../../store/reducers/robot";
import { store } from "../../../store/store";

export const toGrowEye = () => {
  const { dispatch } = store;
  const eyesLeft = getElement("#doubt-eyes-left");
  const eyesRight = getElement("#doubt-eyes-right");

  addQueue(() => {
    audioEffects.set("machine-01");
    eyesLeft.style.rx = "2%";
    eyesLeft.style.ry = "3%";

    eyesRight.style.rx = "5%";
    eyesRight.style.ry = "6%";
  });

  addQueue(() => {
    audioEffects.set("machine-02");

    eyesLeft.style.rx = "3%";
    eyesLeft.style.ry = "4%";

    eyesRight.style.rx = "3%";
    eyesRight.style.ry = "4%";

    addQueue(() => dispatch(setEye("Initial")), 1000);
  }, 2200);
};
