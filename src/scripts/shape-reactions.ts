import { delay, fromEvent, map, merge, of, throttleTime } from "rxjs";
import { bixtronConfig } from "../bixtronconfig";
import { execRandom } from "../helpers/functions";
import {
  addQueue,
  createQueue,
  getCore,
  getElement,
  pauseAnimation,
  playAnimation,
  pxToVh,
  textInteract,
  touchToMouse,
} from "../scripts/aux-actions";
import { setArms, setEye } from "../store/reducers/robot";
import { store } from "../store/store";
import { audioEffects } from "./audio-effects";
import { setCore } from "../store/reducers/bixtronCore";

const lerp = (start: number, end: number, factor: number) =>
  start + (end - start) * factor;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const MAX_BODY_TILT = 12;

export const shapeReactions = {
  init: () => {
    const { dispatch } = store;

    audioEffects.init();
    shapeReactions.setConfigs();
    shapeReactions.setMoveByHead();

    dispatch(setEye("Happy"));
    dispatch(setArms("Waving"));
    textInteract.set(["Que bom te ver aqui!", "Olá!", "Oi!"]);

    const initForm = merge(
      fromEvent(getElement("#content-shape"), "mousedown"),
      fromEvent(getElement("#content-shape"), "touchstart")
    );
    initForm.subscribe(() => {
      addQueue(() => dispatch(setArms("Initial")), 100);
    });
  },
  setConfigs: () => {
    const contentShape = getElement("#content-shape");
    const windowWidth = document.body.clientWidth;

    contentShape.style.left = `${
      windowWidth / 2 - contentShape.getBoundingClientRect().width / 2
    }px`;
  },
  effectGravity: (lastTopPos: number) => {
    const dispatch = store.dispatch;
    const contentShape = getElement("#content-shape");
    const contentRobotPos = contentShape.getBoundingClientRect();
    const floorDefault = document.body.clientHeight - pxToVh(17);

    const percentLastDistance = 100 - (lastTopPos * 100) / floorDefault;

    let newFloor = contentRobotPos.y + bixtronConfig.gravity;

    if (contentRobotPos.y <= floorDefault) {
      contentShape.style.top = `${newFloor}px`;
      dispatch(setCore({ isFalling: true }));

      if (percentLastDistance > 50 && percentLastDistance < 100) {
        dispatch(setArms("ToUp"));
      }
    } else {
      if (newFloor > floorDefault) {
        dispatch(
          setCore({
            isFalling: false,
            isHigh: false,
          })
        );

        dispatch(setArms("Initial"));
        dispatch(setEye("Initial"));

        if (percentLastDistance > 50 && percentLastDistance < 100) {
          execRandom(() => {
            addQueue(() => {
              audioEffects.set(["09", "10"]);
              dispatch(setEye("Dizzy"));
            }, 100);
            addQueue(() => {
              execRandom(() => {
                dispatch(setEye("Anger"));
                audioEffects.set("anger");
              });
            }, 2000);
            addQueue(() => dispatch(setEye("Initial")), 4000);
          });
        }

        newFloor = floorDefault;
      }

      contentShape.style.top = `${newFloor}px`;
      return;
    }

    of(null)
      .pipe(delay(0))
      .subscribe(() => shapeReactions.effectGravity(lastTopPos));
  },
  setMoveByHead: () => {
    const { dispatch } = store;
    const contentShape = getElement("#content-shape");
    const ContentChests = getElement("#ContentChests");
    const documentWidth = document.body.clientWidth;
    const floorDefault = document.body.clientHeight - pxToVh(17);

    const queueBody = createQueue();

    let targetPos = { left: 0, top: 0 };
    let currentPos = { left: 0, top: 0 };
    let velocity = { x: 0, y: 0 };
    let animationFrame: number | null = null;
    let isDragging = false;

    const initialPos = { left: 0, top: 0 };
    let lastTopPos = 0;
    let lastLeftPos = 0;
    let timeToLeft = of(null).pipe(delay(100)).subscribe();

    const SMOOTHING = 0.15;

    const updatePosition = () => {
      if (!isDragging) {
        animationFrame = null;
        return;
      }

      velocity.x = targetPos.left - currentPos.left;
      velocity.y = targetPos.top - currentPos.top;

      currentPos.left = lerp(currentPos.left, targetPos.left, SMOOTHING);
      currentPos.top = lerp(currentPos.top, targetPos.top, SMOOTHING);

      const tiltAmount = clamp(velocity.x * 0.3, -MAX_BODY_TILT, MAX_BODY_TILT);
      ContentChests.style.transform = `rotate(${tiltAmount}deg)`;

      contentShape.style.left = `${currentPos.left}px`;
      contentShape.style.top = `${currentPos.top}px`;

      animationFrame = requestAnimationFrame(updatePosition);
    };

    merge(
      fromEvent(getElement("#head"), "mousedown"),
      fromEvent(getElement("#head"), "touchstart").pipe(
        map((e) => touchToMouse(e as TouchEvent, "touchstart"))
      )
    ).subscribe((event) => {
      const e = event as MouseEvent;
      initialPos.left = e.clientX;
      initialPos.top = e.clientY;

      currentPos.left = contentShape.offsetLeft;
      currentPos.top = contentShape.offsetTop;
      targetPos.left = currentPos.left;
      targetPos.top = currentPos.top;

      isDragging = true;

      if (lastLeftPos == 0) {
        lastLeftPos = e.clientY;
      }

      if (!animationFrame) {
        animationFrame = requestAnimationFrame(updatePosition);
      }

      const mousemove = merge(
        fromEvent(document, "mousemove"),
        fromEvent(document, "touchmove").pipe(
          map((e) => touchToMouse(e as TouchEvent, "touchmove"))
        )
      ).subscribe((event) => {
        const e = event as MouseEvent;
        timeToLeft.unsubscribe();
        timeToLeft = of(null)
          .pipe(delay(100))
          .subscribe(() => {
            lastLeftPos = e.clientX;
          });

        const deltaX = e.clientX - initialPos.left;
        const deltaY = e.clientY - initialPos.top;

        initialPos.left = e.clientX;
        initialPos.top = e.clientY;
        lastTopPos = initialPos.top;

        let newTop = targetPos.top + deltaY;
        let newLeft = targetPos.left + deltaX;

        const percentDistance = 100 - (newTop * 100) / floorDefault;

        if (percentDistance > 55) {
          dispatch(setCore({ isHigh: true }));
          addQueue(
            () => {
              if (getCore().isHigh) {
                dispatch(setEye("Worried"));
                addQueue(() => {
                  const worriedEyes = getElement("#worried-eyes");

                  if (worriedEyes !== null) {
                    dispatch(setCore({ isAfraid: true }));
                    worriedEyes.style.transform =
                      "translateX(165px) translateY(20px)";
                    audioEffects.set(["01", "02"]);
                  }
                }, 600);
              }
            },
            600,
            true
          );
        } else {
          dispatch(setCore({ isHigh: false }));

          if (getCore().isAfraid == true) {
            if (percentDistance <= 5) {
              store.dispatch(setEye("Happy"));
              addQueue(
                () => {
                  store.dispatch(setEye("Initial"));
                },
                1000,
                true
              );
            }

            dispatch(setCore({ isAfraid: false }));
          }
        }

        newTop = clamp(
          newTop,
          pxToVh(bixtronConfig.floorPosition),
          floorDefault
        );
        newLeft = clamp(newLeft, -150, documentWidth - 200);

        targetPos.left = newLeft;
        targetPos.top = newTop;
      });

      const closeDrag = merge(
        fromEvent(document, "mouseup"),
        fromEvent(document, "touchend")
      ).subscribe(() => {
        isDragging = false;
        closeDrag.unsubscribe();
        mousemove.unsubscribe();

        queueBody.stop();
        queueBody.add(() => {
          ContentChests.style.transform = "";
        }, 50);
      });

      const setGravity = merge(
        fromEvent(document, "mouseup"),
        fromEvent(document, "touchend")
      )
        .pipe(throttleTime(100))
        .subscribe(() => {
          execRandom(() => audioEffects.set(["fear-01", "fear-02"]));
          shapeReactions.effectGravity(lastTopPos);
          setGravity.unsubscribe();
        });

      audioEffects.set(["05", "06"], true);
    });

    merge(
      fromEvent(getElement("#head"), "touchend"),
      fromEvent(getElement("#head"), "mouseup")
    ).subscribe(() => {
      playAnimation("#content-robot");
      playAnimation("#content-shadow");
    });

    merge(
      fromEvent(getElement("#head"), "touchstart"),
      fromEvent(getElement("#head"), "mousedown")
    ).subscribe(() => {
      pauseAnimation("#content-robot");
      pauseAnimation("#content-shadow");
    });

    fromEvent(getElement("#ContentChests"), "click").subscribe(() => {
      dispatch(setEye("Doubt"));
    });
  },
};
