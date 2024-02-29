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
    eyesLeft.style.setProperty("rx", "2%");
    eyesLeft.style.setProperty("ry", "3%");

    eyesRight.style.setProperty("rx", "5%");
    eyesRight.style.setProperty("ry", "6%");
  });

  addQueue(() => {
    audioEffects.set("machine-02");

    eyesLeft.style.setProperty("rx", "3%");
    eyesLeft.style.setProperty("ry", "4%");

    eyesRight.style.setProperty("rx", "3%");
    eyesRight.style.setProperty("ry", "4%");

    addQueue(() => dispatch(setEye("Initial")), 1000);
  }, 2200);
};
