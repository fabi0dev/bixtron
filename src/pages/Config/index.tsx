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
  setEyeStyle,
} from "../../store/reducers/robot";
import { audioEffects } from "../../scripts/audio-effects";
import { delay, of } from "rxjs";
import { Button } from "../../components";
import { Compact, Wheel } from "@uiw/react-color";
import { useNavigate } from "react-router-dom";

const eyeStyles = [
  { id: "round", name: "Redondo", icon: "●" },
  { id: "oval", name: "Oval", icon: "⬭" },
  { id: "square", name: "Quadrado", icon: "■" },
  { id: "star", name: "Estrela", icon: "★" },
  { id: "heart", name: "Coração", icon: "♥" },
  { id: "visor", name: "Visor", icon: "▬" },
];

export default function Config() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [initEvents, setInitEvents] = useState(false);
  const [viewAppearance, setViewAppearance] = useState(false);
  const [configNumber, setConfigNumber] = useState(1);
  const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 });
  const { configured } = useSelector(selectorRobot);

  const {
    colors: { body1, body2 },
    eyeStyle,
  } = useSelector(selectorRobot);

  const setColorEyes = (color: string) => {
    dispatch(setEye("Initial"));
    dispatch(setEyeColor(color));
  };

  const events = useCallback(() => {
    if (!configured) {
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
    } else {
      setViewAppearance(true);
      textInteract.set(
        [
          "Me deixe bem estiloso!",
          "Coloque uma cor vibrante em meus olhos!",
          "Um visual dark cairia bem!",
          "Deixe sua criatividade fluir!",
        ],
        () => {},
        true
      );
    }
  }, [configured]);

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
          <div
            id="container-colors" /* className="grid grid-cols-[300px_auto]" */
          >
            <div>
              <ContentShape>
                <Initial id="svg-robot" />
              </ContentShape>
            </div>

            {/* cor dos olhos */}
            {viewAppearance && configNumber == 1 && (
              <div id="config-appearance" className="config-card">
                <div className="config-header">
                  <span className="config-step">1/2</span>
                  <h2 className="config-title">Cor dos Olhos</h2>
                  <p className="config-subtitle">Escolha uma cor que te agrada</p>
                </div>

                <div className="color-picker-wrapper">
                  <Wheel
                    width={160}
                    height={160}
                    color={hsva}
                    onChange={(color) => {
                      setColorEyes(color.hex);
                      setHsva({ ...hsva, ...color.hsva });
                    }}
                  />
                  <div 
                    className="color-preview"
                    style={{ backgroundColor: `hsla(${hsva.h}, ${hsva.s}%, ${hsva.v}%, ${hsva.a})` }}
                  />
                </div>

                <div className="eye-styles-section">
                  <p className="eye-styles-label">Estilo dos olhos</p>
                  <div className="eye-styles-grid">
                    {eyeStyles.map((style) => (
                      <div
                        key={style.id}
                        className={`eye-style-option ${eyeStyle === style.id ? "active" : ""}`}
                        onClick={() => dispatch(setEyeStyle(style.id))}
                        title={style.name}
                      >
                        <span className="eye-style-icon">{style.icon}</span>
                        <span className="eye-style-name">{style.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="config-actions">
                  <Button
                    onClick={() => {
                      setConfigNumber(2);
                      dispatch(setEye("Happy"));
                    }}
                    className="btn-next"
                  >
                    Cor do corpo →
                  </Button>
                </div>
              </div>
            )}

            {/* cor do corpo */}
            {viewAppearance && configNumber == 2 && (
              <div id="config-appearance" className="config-card">
                <div className="config-header">
                  <span className="config-step">2/2</span>
                  <h2 className="config-title">Cor do Corpo</h2>
                  <p className="config-subtitle">Personalize as cores do robô</p>
                </div>

                <div id="content-colors">
                  <div className="color-section">
                    <div className="color-label">
                      <span className="color-dot" style={{ backgroundColor: body1 }} />
                      Predominante
                    </div>
                    <Compact
                      color={body1}
                      style={{ backgroundColor: "transparent" }}
                      onChange={(color) => dispatch(setBodyColor1(color.hex))}
                    />
                  </div>

                  <div className="color-section">
                    <div className="color-label">
                      <span className="color-dot" style={{ backgroundColor: body2 }} />
                      Secundária
                    </div>
                    <Compact
                      color={body2}
                      style={{ backgroundColor: "transparent" }}
                      onChange={(color) => dispatch(setBodyColor2(color.hex))}
                    />
                  </div>
                </div>

                <div className="config-actions dual">
                  <Button
                    onClick={() => setConfigNumber(1)}
                    className="btn-back"
                  >
                    ← Voltar
                  </Button>

                  <Button
                    onClick={() => {
                      dispatch(setConfigured(true));
                      navigate("/home");
                    }}
                    className="btn-save"
                  >
                    ✓ Salvar
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
