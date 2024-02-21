import { useCallback, useEffect, useState } from "react";
import { ContentShape } from "../../details";
import { Initial } from "../../shapes/Body";
import "./style.scss";
import { textInteract } from "../../scripts/aux-actions";
import { useDispatch, useSelector } from "react-redux";
import {
  selectorRobot,
  setBodyColor1,
  setBodyColor2,
  setConfigured,
  setEye,
  setEyeColor,
} from "../../store/reducers/robot";
import { audioEffects } from "../../scripts/audio-effects";
import { delay, of } from "rxjs";
import { Button } from "../../components";
import { Compact, Wheel } from "@uiw/react-color";
import { useNavigate } from "react-router-dom";

export default function Config() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [initEvents, setInitEvents] = useState(false);
  const [viewAppearance, setViewAppearance] = useState(false);
  const [configNumber, setConfigNumber] = useState(1);
  const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 });

  const {
    colors: { body1, body2 },
  } = useSelector(selectorRobot);

  const setColorEyes = (color: string) => {
    dispatch(setEye("Initial"));
    dispatch(setEyeColor(color));
  };

  const events = useCallback(() => {
    of(null)
      .pipe(delay(500))
      .subscribe(() => {
        textInteract.set("Olá!", () => {
          audioEffects.set("01");

          textInteract.set("Vamos escolher um visual?", () => {
            setViewAppearance(true);
          });
        });
      });
  }, [setViewAppearance]);

  useEffect(() => {
    if (!initEvents) {
      setInitEvents(true);
      events();
    }
  }, [events, initEvents]);

  return (
    <>
      <div id="container-config">
        <div id="robo-container">
          <div className="grid grid-cols-[300px_auto]">
            <div>
              <ContentShape>
                <Initial />
              </ContentShape>
            </div>

            {/* cor dos olhos */}
            {viewAppearance && configNumber == 1 && (
              <div id="config-appearance">
                <div className="font-bold font-sans text-xl">Cor dos Olhos</div>
                <div className="font-sans text-xs mb-4  ">
                  Escolhar uma cor que te agrada.
                </div>

                <div className="flex justify-center">
                  <Wheel
                    width={150}
                    height={150}
                    color={hsva}
                    onChange={(color) => {
                      setColorEyes(color.hex);
                      setHsva({ ...hsva, ...color.hsva });
                    }}
                  />
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={() => {
                      setConfigNumber(2);
                      dispatch(setEye("Happy"));
                    }}
                    className="mt-5"
                  >
                    {"Cor do corpo >"}
                  </Button>
                </div>
              </div>
            )}

            {/* cor do corpo */}
            {viewAppearance && configNumber == 2 && (
              <div id="config-appearance">
                <div className="font-bold font-sans text-xl">Cor do corpo</div>

                <div className="font-sans text-xs mb-2">Predominante</div>
                <div className="content-colors  mb-1">
                  <Compact
                    color={body1}
                    style={{
                      backgroundColor: "transparent",
                    }}
                    onChange={(color) => {
                      dispatch(setBodyColor1(color.hex));
                    }}
                  />
                </div>

                <div className="font-sans text-xs mt-3 mb-2">Secundária</div>
                <div className="content-colors  mb-1">
                  <Compact
                    color={body2}
                    style={{
                      backgroundColor: "transparent",
                    }}
                    onChange={(color) => {
                      dispatch(setBodyColor2(color.hex));
                    }}
                  />
                </div>

                <div className="flex justify-center gap-2">
                  <Button
                    onClick={() => setConfigNumber(1)}
                    className="mt-5"
                    children="< Cor dos olhos"
                  />

                  <Button
                    onClick={() => {
                      dispatch(setConfigured(true));
                      navigate("/");
                    }}
                    className="mt-5 bg-green-600"
                    children="Salvar"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
