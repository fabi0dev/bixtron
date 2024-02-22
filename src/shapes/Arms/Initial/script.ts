import { fromEvent, map, race } from "rxjs";
import { getElement, touchToMouse } from "../../../scripts/aux-actions";

const interactArmRight = () => {
  const armRight = getElement("#arm-right");
  const armRightPos = armRight.getBoundingClientRect();

  const initialPos = {
    left: 0,
    top: 0,
  };

  let rotateZ = 0;
  let translateX = 329;
  let translateY = 350;

  const defaultsValues = {
    rotateZ: 0,
    translateX: 329,
    translateY: 350,
  };

  race(fromEvent(armRight, "mousedown"), fromEvent(armRight, "touchstart"))
    .pipe(map((e) => touchToMouse(e as TouchEvent, "touchmove")))
    .subscribe(function (e: MouseEvent) {
      initialPos.left = e.clientX;
      initialPos.top = e.clientY;

      const initY = e.clientY;

      race(
        fromEvent(document, "mouseup"),
        fromEvent(document, "touchend")
      ).subscribe(() => {
        armRight.style.transform =
          "rotate(-13deg) translateY(350px) translateX(329px)";
        armRight.style.transition = "all .7s ease-out";
        rotateZ = 0;
        translateX = 329;
        translateY = 350;
      });

      //quando move
      const mousemove = race(
        fromEvent(document, "mousemove"),
        fromEvent(document, "touchmove").pipe(
          map((e) => touchToMouse(e as TouchEvent, "touchmove"))
        )
      ).subscribe(function (e: MouseEvent) {
        //subindo
        const maxPosTop = {
          rotateZ: 150,
          translateX: 360,
          translateY: 240,
        };
        const distanceCur = initY - e.clientY;
        let percentDistance = (distanceCur * 100) / armRightPos.height;
        percentDistance = percentDistance > 100 ? 100 : percentDistance;

        rotateZ = -(maxPosTop.rotateZ / 100) * percentDistance;
        translateX =
          defaultsValues.translateX +
          ((maxPosTop.translateX - defaultsValues.translateX) / 100) *
            percentDistance;

        translateY =
          defaultsValues.translateY -
          ((defaultsValues.translateY - maxPosTop.translateY) / 100) *
            percentDistance;

        if (rotateZ > 0) {
          rotateZ = 0;
        }

        //----
        if (translateY < 245) {
          translateY = 245;
        }
        if (translateY > defaultsValues.translateY) {
          translateY = defaultsValues.translateY;
        }

        if (rotateZ < -150) {
          rotateZ = -150;
        }
        //---

        //posição do corpo de acordo com o mouse
        armRight.style.transform = `rotate(-13deg) translateY(${translateY}px) translateX(${translateX}px) rotateZ(${rotateZ}deg)`;
        armRight.style.transition = "none";
      });

      //quando solta
      const closeDrag = race(
        fromEvent(document, "mouseup"),
        fromEvent(document, "touchend")
      ).subscribe(() => {
        closeDrag.unsubscribe();
        mousemove.unsubscribe();
      });

      //ativa gravidade por que está no alto
    });
};

const interactArmLeft = () => {
  const armLeft = getElement("#arm-left");
  const armRightPos = armLeft.getBoundingClientRect();

  const initialPos = {
    left: 0,
    top: 0,
  };

  let rotateZ = 0;
  let translateX = 199;
  let translateY = 228;

  const defaultsValues = {
    rotateZ: 0,
    translateX: 199,
    translateY: 228,
  };

  race(fromEvent(armLeft, "mousedown"), fromEvent(armLeft, "touchstart"))
    .pipe(map((e) => touchToMouse(e as TouchEvent, "touchmove")))
    .subscribe(function (e: MouseEvent) {
      initialPos.left = e.clientX;
      initialPos.top = e.clientY;

      const initY = e.clientY;

      race(
        fromEvent(document, "mouseup"),
        fromEvent(document, "touchend")
      ).subscribe(() => {
        rotateZ = defaultsValues.rotateZ;
        translateX = defaultsValues.translateX;
        translateY = defaultsValues.translateY;

        armLeft.style.transform = `rotate(13deg) translateY(${translateY}px) translateX(${translateX}px)`;
        armLeft.style.transition = "all .7s ease-out";
      });

      //quando move
      const mousemove = race(
        fromEvent(document, "mousemove"),
        fromEvent(document, "touchmove").pipe(
          map((e) => touchToMouse(e as TouchEvent, "touchmove"))
        )
      ).subscribe(function (e: MouseEvent) {
        //subindo
        const maxPosTop = {
          rotateZ: 150,
          translateX: 165,
          translateY: 140,
        };

        const distanceCur = initY - e.clientY;
        let percentDistance = (distanceCur * 100) / armRightPos.height;
        percentDistance = percentDistance > 100 ? 100 : percentDistance;

        rotateZ = (maxPosTop.rotateZ / 100) * percentDistance;
        translateX =
          defaultsValues.translateX +
          ((maxPosTop.translateX - defaultsValues.translateX) / 100) *
            percentDistance;

        translateY =
          defaultsValues.translateY -
          ((defaultsValues.translateY - maxPosTop.translateY) / 100) *
            percentDistance;

        if (rotateZ < 0) {
          rotateZ = 0;
        }

        //----

        if (translateY > defaultsValues.translateY) {
          translateY = defaultsValues.translateY;
        }

        //posição do corpo de acordo com o mouse
        armLeft.style.transform = `rotate(13deg) translateY(${translateY}px) translateX(${translateX}px) rotateZ(${rotateZ}deg)`;
        armLeft.style.transition = "none";
      });

      //quando solta
      const closeDrag = race(
        fromEvent(document, "mouseup"),
        fromEvent(document, "touchend")
      ).subscribe(() => {
        closeDrag.unsubscribe();
        mousemove.unsubscribe();
      });

      //ativa gravidade por que está no alto
    });
};

export { interactArmRight, interactArmLeft };
