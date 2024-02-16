import {
  asyncScheduler,
  concatMap,
  delay,
  from,
  fromEvent,
  interval,
  map,
  mapTo,
  merge,
  of,
  scan,
  startWith,
  throttleTime,
} from "rxjs";
import { bixtronConfig } from "../bixtronconfig";
import { execRandom, fn } from "../helpers/functions";
import {
  addQueue,
  createQueue,
  getCore,
  getElement,
  subsTime,
} from "../scripts/aux-actions";
import { setArms, setEye } from "../store/reducers/robot";
import { store } from "../store/store";
import { audioEffects } from "./audio-effects";
import { setCore } from "../store/reducers/bixtronCore";

export const shapeReactions = {
  init: () => {
    shapeReactions.setConfigs();
    shapeReactions.setMoveByHead();
    audioEffects.init();
  },
  setConfigs: () => {
    const contentShape = document.querySelector(
      "#content-shape"
    ) as HTMLInputElement;
    const documentHeight = document.body.clientHeight;

    //definindo o chão dele, não pode descer mais que isso
    contentShape.style.top = `${
      documentHeight - bixtronConfig.floorPosition - contentShape.clientHeight
    }px`;
  },
  //efeito gravidade
  effectGravity: (lastTopPos: number) => {
    const dispatch = store.dispatch;
    const contentShape = getElement("#content-shape");
    const contentRobotPos = contentShape.getBoundingClientRect();

    const documentHeight = document.body.clientHeight;
    const floorDefault =
      documentHeight - bixtronConfig.floorPosition - contentShape.clientHeight;

    const percentLastDistance = 100 - (lastTopPos * 100) / floorDefault;

    let newFloor = contentRobotPos.y + bixtronConfig.gravity;

    if (contentRobotPos.y <= floorDefault) {
      contentShape.style.top = `${newFloor}px`;
      dispatch(setCore({ isFalling: true })); // está caindo

      if (percentLastDistance > 50) {
        store.dispatch(setArms("ToUp"));
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
            addQueue(() => dispatch(setEye("Dizzy")), 100);
            addQueue(() => dispatch(setEye("Initial")), 1000);
            addQueue(() => {
              //se deixou cair ele fica bravo
              dispatch(setEye("Anger"));
              audioEffects.set("anger");
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
    const contentShape = getElement("#content-shape");
    const ContentChests = getElement("#ContentChests");

    const documentHeight = document.body.clientHeight;
    const floorDefault =
      documentHeight - bixtronConfig.floorPosition - contentShape.clientHeight;

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

    fromEvent(getElement("#head"), "mousedown")
      .pipe(map((e) => e))
      .subscribe(function (e: MouseEvent) {
        e.preventDefault();

        initialPos.left = e.clientX;
        initialPos.top = e.clientY;

        //quando move
        const mousemove = fromEvent(document, "mousemove")
          .pipe(map((e) => e))
          .subscribe(function (e: MouseEvent) {
            e.preventDefault();

            mousePos = {
              left: initialPos.left - e.clientX,
              top: initialPos.top - e.clientY,
            };

            initialPos.left = e.clientX;
            initialPos.top = e.clientY;
            lastTopPos = initialPos.top;

            let newTop = contentShape.offsetTop - mousePos.top;
            const percentDistance = 100 - (newTop * 100) / floorDefault;

            //se tiver alto ele fica com medo
            if (percentDistance > 55) {
              store.dispatch(setCore({ isHigh: true })); //está no alto
              addQueue(
                () => {
                  if (getCore().isHigh) {
                    store.dispatch(setEye("Worried")); //olhos preocupados
                    addQueue(() => {
                      const worriedEyes = getElement("#worried-eyes"); //olhos de medo

                      if (worriedEyes !== null) {
                        store.dispatch(setCore({ isAfraid: true })); // está  com medo
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

                store.dispatch(setCore({ isAfraid: false })); //não está mais com medo
              }
            }

            if (newTop > floorDefault) {
              newTop = floorDefault;
            } else {
              const bodyPlayLeft = subsTime(() => {
                ContentChests.style.transform =
                  "rotate(-10deg) translateY(59px)";
              }, 20);

              const bodyPlayRight = subsTime(() => {
                ContentChests.style.transform = `rotateZ(10deg)`;
              }, 20);

              //jogando o corpo para esquerda/direita quando arrasta
              if (mousePos.left > 0) {
                bodyPlayRight.unsubscribe();
              } else {
                bodyPlayLeft.unsubscribe();
              }
            }

            //posição do corpo de acordo com o mouse
            contentShape.style.left =
              contentShape.offsetLeft - mousePos.left + "px";
            contentShape.style.top = `${newTop}px`;

            //volta o corpo para normal
            queueBody.stop();
            queueBody.add(() => {
              ContentChests.style.transform = "";
            }, 200);
          });

        //quando solta
        const closeDrag = fromEvent(document, "mouseup").subscribe(() => {
          closeDrag.unsubscribe();
          mousemove.unsubscribe();
        });

        //ativa gravidade por que está no alto
        const setGravity = fromEvent(document, "mouseup")
          .pipe(throttleTime(100))
          .subscribe(() => {
            shapeReactions.effectGravity(lastTopPos);
            setGravity.unsubscribe();
          });

        audioEffects.set(["05", "06"], true);
      });

    fromEvent(getElement("#head"), "click").subscribe(() => {
      console.log("ok");
    });
    //end drag
  },
};
