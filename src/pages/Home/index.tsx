import { useCallback, useEffect, useRef, useState } from "react";
import { ContentShape } from "../../details";
import { shapeReactions } from "../../scripts/shape-reactions";
import { Initial } from "../../shapes/Body";
import * as Icons from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { selectorRobot, setSantaHat, setSnowEffect, setScarf, setThruster } from "../../store/reducers/robot";
import "./style.scss";
import { useNavigate } from "react-router";

interface Snowflake {
  id: number;
  x: number;
  y: number;
  speed: number;
  opacity: number;
  size: number;
}

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    colors: { eyes, body1 },
    santaHat,
    snowEffect,
    scarf,
    thruster,
  } = useSelector(selectorRobot);

  const [showModal, setShowModal] = useState(false);
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
  const animationRef = useRef<number>();

  const createSnowflake = (id: number): Snowflake => ({
    id,
    x: Math.random() * window.innerWidth,
    y: -10,
    speed: 0.5 + Math.random() * 0.8,
    opacity: 0.4 + Math.random() * 0.6,
    size: 4 + Math.random() * 6,
  });

  useEffect(() => {
    if (!snowEffect) {
      setSnowflakes([]);
      return;
    }

    const initialFlakes = Array.from({ length: 50 }, (_, i) => ({
      ...createSnowflake(i),
      y: Math.random() * window.innerHeight,
    }));
    setSnowflakes(initialFlakes);

    let nextId = 50;

    const animate = () => {
      const contentShape = document.querySelector("#content-shape");
      const roboRect = contentShape?.getBoundingClientRect();

      setSnowflakes((prev) =>
        prev.map((flake) => {
          let newY = flake.y + flake.speed;
          let newX = flake.x;

          // Colisão com o robô
          if (roboRect) {
            const margin = 5;
            const flakeInRoboX = flake.x > roboRect.left - margin && flake.x < roboRect.right + margin;
            const flakeInRoboY = flake.y > roboRect.top - margin && flake.y < roboRect.bottom + margin;

            if (flakeInRoboX && flakeInRoboY) {
              const roboCenter = roboRect.left + roboRect.width / 2;
              const roboCenterY = roboRect.top + roboRect.height / 2;
              
              const escapeX = flake.x < roboCenter ? -3 : 3;
              const escapeY = flake.y < roboCenterY ? -2 : 2;
              
              newX += escapeX;
              newY += escapeY;
            }
          }

          // Reset quando sai da tela
          if (newY > window.innerHeight || newX < 0 || newX > window.innerWidth) {
            return { ...createSnowflake(nextId++), y: -10 };
          }

          return { ...flake, x: newX, y: newY };
        })
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [snowEffect]);

  // Verifica se está no período natalino (novembro e dezembro até dia 25)
  const isChristmasSeason = () => {
    const today = new Date();
    const month = today.getMonth();
    const day = today.getDate();
    // Novembro (10) inteiro ou Dezembro (11) até dia 25
    return month === 10 || (month === 11 && day <= 25);
  };

  const events = useCallback(() => {
    setTimeout(() => {
      shapeReactions.init();
    }, 100);
  }, []);

  useEffect(() => {
    events();
  }, [events]);

  return (
    <>
      <div id="container-home">
        <div id="menu">
          <div className="item" onClick={() => setShowModal(true)}>
            <Icons.SparklesIcon
              stroke={eyes}
              fill={body1}
              className="h-10 w-10"
            />
          </div>
          <div
            className="item"
            onClick={() => {
              navigate("/config");
            }}
          >
            <Icons.Cog8ToothIcon
              stroke={eyes}
              fill={body1}
              className="h-10 w-10"
            />
          </div>
        </div>

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <Icons.SparklesIcon className="header-icon" />
                <h2>Acessórios</h2>
                <button className="modal-close" onClick={() => setShowModal(false)}>
                  <Icons.XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="modal-body">
                {isChristmasSeason() && (
                  <>
                    <h3 className="section-title">🎄 Natal</h3>
                    <div className="accessories-grid">
                      <div
                        className={`accessory-card ${santaHat ? "active" : ""}`}
                        onClick={() => dispatch(setSantaHat(!santaHat))}
                      >
                        <div className="accessory-image">
                          <img src="/assets/images/natal.png" alt="Chapéu de Natal" />
                        </div>
                        <div className="accessory-info">
                          <span className="accessory-name">Chapéu de Natal</span>
                          <span className="accessory-desc">Gorro do Papai Noel</span>
                        </div>
                        <div className={`accessory-toggle ${santaHat ? "on" : ""}`}>
                          <div className="toggle-dot" />
                        </div>
                      </div>

                      <div
                        className={`accessory-card ${scarf ? "active" : ""}`}
                        onClick={() => dispatch(setScarf(!scarf))}
                      >
                        <div className="accessory-image">
                          <img src="/assets/images/cachecol.png" alt="Cachecol" />
                        </div>
                        <div className="accessory-info">
                          <span className="accessory-name">Cachecol</span>
                          <span className="accessory-desc">Para dias frios</span>
                        </div>
                        <div className={`accessory-toggle ${scarf ? "on" : ""}`}>
                          <div className="toggle-dot" />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <h3 className="section-title">🚀 Propulsão</h3>
                <div className="accessories-grid">
                  <div
                    className={`accessory-card ${thruster ? "active" : ""}`}
                    onClick={() => dispatch(setThruster(!thruster))}
                  >
                    <div className="accessory-image effect-icon">
                      <span style={{ fontSize: "28px" }}>🔥</span>
                    </div>
                    <div className="accessory-info">
                      <span className="accessory-name">Propulsor</span>
                      <span className="accessory-desc">Fogo azul de propulsão</span>
                    </div>
                    <div className={`accessory-toggle ${thruster ? "on" : ""}`}>
                      <div className="toggle-dot" />
                    </div>
                  </div>
                </div>

                {isChristmasSeason() && (
                  <>
                    <h3 className="section-title">✨ Efeitos Sazonais</h3>
                    <div className="accessories-grid">
                      <div
                        className={`accessory-card ${snowEffect ? "active" : ""}`}
                        onClick={() => dispatch(setSnowEffect(!snowEffect))}
                      >
                        <div className="accessory-image effect-icon">
                          <span style={{ fontSize: "28px" }}>❄️</span>
                        </div>
                        <div className="accessory-info">
                          <span className="accessory-name">Neve Caindo</span>
                          <span className="accessory-desc">Flocos de neve</span>
                        </div>
                        <div className={`accessory-toggle ${snowEffect ? "on" : ""}`}>
                          <div className="toggle-dot" />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        <div id="robo-container">
          <ContentShape>
            <Initial />
          </ContentShape>
        </div>

        {snowEffect && (
          <div className="snow-container">
            {snowflakes.map((flake) => (
              <div
                key={flake.id}
                className="snowflake"
                style={{
                  left: flake.x,
                  top: flake.y,
                  opacity: flake.opacity,
                  fontSize: `${flake.size}px`,
                }}
              >
                ❄
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
