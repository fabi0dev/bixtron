import { delay, fromEvent, map, of, race, throttleTime } from "rxjs";
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

export const shapeReactions = {
  init: () => {
    const { dispatch } = store;

    audioEffects.init();
    shapeReactions.setConfigs();
    shapeReactions.setMoveByHead();

    dispatch(setEye("Happy"));
    dispatch(setArms("Waving"));
    textInteract.set(["Que bom te ver aqui!", "Olá!", "Oi!"]);

    const initForm = fromEvent(getElement("#content-shape"), "mousedown");
    initForm.subscribe(() => {
      addQueue(() => dispatch(setArms("Initial")), 100);
      initForm.subscribe();
    });
  },
  setConfigs: () => {
    const contentShape = getElement("#content-shape");
    const windowWidth = document.body.clientWidth;

    //definindo o chão dele, não pode descer mais que isso
    contentShape.style.left = `${
      windowWidth / 2 - contentShape.getBoundingClientRect().width / 2
    }px`;
  },
  //efeito gravidade
  effectGravity: (lastTopPos: number) => {
    const dispatch = store.dispatch;
    const contentShape = getElement("#content-shape");
    const contentRobotPos = contentShape.getBoundingClientRect();
    const floorDefault = document.body.clientHeight - pxToVh(17);

    const percentLastDistance = 100 - (lastTopPos * 100) / floorDefault;

    let newFloor = contentRobotPos.y + bixtronConfig.gravity;

    if (contentRobotPos.y <= floorDefault) {
      contentShape.style.top = `${newFloor}px`;
      dispatch(setCore({ isFalling: true })); // está caindo

      if (percentLastDistance > 50 && percentLastDistance < 100) {
        dispatch(setArms("ToUp"));
      }
    } else {
      //chegou no chão
      if (newFloor > floorDefault) {
        dispatch(
          setCore({
            isFalling: false, // não está mais caindo
            isHigh: false, // não está mais no alto
          })
        );

        dispatch(setArms("Initial")); //braços iniciais
        dispatch(setEye("Initial")); //olhos iniciais

        if (percentLastDistance > 50 && percentLastDistance < 100) {
          execRandom(() => {
            addQueue(() => {
              audioEffects.set(["09", "10"]);
              dispatch(setEye("Dizzy"));
            }, 100);
            addQueue(() => {
              execRandom(() => {
                //se deixou cair ele fica bravo
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

    //fazendo ficar recursiva
    of(null)
      .pipe(delay(0))
      .subscribe(() => shapeReactions.effectGravity(lastTopPos));
  },
  //arrastar corpo pela cabeça
  setMoveByHead: () => {
    const { dispatch } = store;
    const contentShape = getElement("#content-shape");
    const ContentChests = getElement("#ContentChests");
    const documentWidth = document.body.clientWidth;
    const floorDefault = document.body.clientHeight - pxToVh(17);

    const queueBody = createQueue();

    let mousePos = {
      left: 0,
      top: 0,
    };

    const initialPos = {
      left: 0,
      top: 0,
    };

    let lastTopPos = 0;
    let lastLeftPos = 0;
    let timeToLeft = of(null).pipe(delay(100)).subscribe();

    race(
      fromEvent(getElement("#head"), "mousedown"),
      fromEvent(getElement("#head"), "touchstart")
    )
      .pipe(map((e) => e))
      .subscribe(function (e: MouseEvent) {
        initialPos.left = e.clientX;
        initialPos.top = e.clientY;

        if (lastLeftPos == 0) {
          lastLeftPos = e.clientY;
        }

        //quando move
        const mousemove = race(
          fromEvent(document, "mousemove"),
          fromEvent(document, "touchmove").pipe(
            map((e) => touchToMouse(e as TouchEvent, "touchmove"))
          )
        ).subscribe(function (e: MouseEvent) {
          timeToLeft.unsubscribe();
          timeToLeft = of(null)
            .pipe(delay(100))
            .subscribe(() => {
              lastLeftPos = e.clientX;
            });

          mousePos = {
            left: initialPos.left - e.clientX,
            top: initialPos.top - e.clientY,
          };

          initialPos.left = e.clientX;
          initialPos.top = e.clientY;
          lastTopPos = initialPos.top;

          let newTop = contentShape.offsetTop - mousePos.top;
          let newLeft = contentShape.offsetLeft - mousePos.left;

          const percentDistance = 100 - (newTop * 100) / floorDefault;

          //se tiver alto ele fica com medo
          if (percentDistance > 55) {
            dispatch(setCore({ isHigh: true })); //está no alto
            addQueue(
              () => {
                if (getCore().isHigh) {
                  dispatch(setEye("Worried")); //olhos preocupados
                  addQueue(() => {
                    const worriedEyes = getElement("#worried-eyes"); //olhos de medo

                    if (worriedEyes !== null) {
                      dispatch(setCore({ isAfraid: true })); // está  com medo
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
            dispatch(setCore({ isHigh: false })); //está no alto

            //se tiver com medo e colocou ele no chão, faz cara de aliviado
            if (getCore().isAfraid == true) {
              //já está no chão, está seguro
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

              dispatch(setCore({ isAfraid: false })); //não está mais com medo
            }
          }

          //se tentar passar do chão
          if (newTop > floorDefault) {
            newTop = floorDefault;
          } else {
            //jogando o corpo para esquerda/direita quando arrasta
            if (lastLeftPos - 80 > e.clientX) {
              ContentChests.style.transform = "rotate(-10deg) translateY(59px)";
            } else if (lastLeftPos + 80 < e.clientX) {
              ContentChests.style.transform = `rotateZ(10deg)`;
            }
          }

          newTop =
            newTop < pxToVh(bixtronConfig.floorPosition)
              ? pxToVh(bixtronConfig.floorPosition)
              : newTop;
          newLeft = newLeft < -150 ? -150 : newLeft;
          const maxLeft = documentWidth - 200;

          if (newLeft > maxLeft) {
            newLeft = maxLeft;
          }

          //posição do corpo de acordo com o mouse
          contentShape.style.left = `${newLeft}px`;
          contentShape.style.top = `${newTop}px`;

          //volta o corpo para normal
          queueBody.stop();
          queueBody.add(() => {
            ContentChests.style.transform = "";
          }, 200);
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
        const setGravity = race(
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

    //se clicou pausa a animação de flutuar
    race(
      fromEvent(getElement("#head"), "touchend"),
      fromEvent(getElement("#head"), "mouseup")
    ).subscribe(() => {
      playAnimation("#content-robot");
      playAnimation("#content-shadow");
    });

    race(
      fromEvent(getElement("#head"), "touchstart"),
      fromEvent(getElement("#head"), "mousedown")
    ).subscribe(() => {
      pauseAnimation("#content-robot");
      pauseAnimation("#content-shadow");
    });
    //----

    fromEvent(getElement("#ContentChests"), "click").subscribe(() => {
      dispatch(setEye("Doubt"));
    });
    //end drag
  },
};
