import * as Heads from "../../Heads";
import * as Eyes from "../../Eyes";
import * as Chests from "../../Chests";
import * as Arms from "../../Arms";
import "./style.scss";
import { ContentChests, ContentHead } from "../../../details";
import { useSelector } from "react-redux";
import { selectorRobot } from "../../../store/reducers/robot";

export const Initial = ({ width = 300, height = 300, ...props }) => {
  const {
    eyes,
    arms,
    scarf,
    thruster,
    colors: { body1, body2 },
  } = useSelector(selectorRobot);

  return (
    <>
      <svg
        viewBox="0 -4 500 500"
        width={width}
        height={height}
        {...props}
        style={{ overflow: "visible" }}
      >
        <svg>
          <defs>
            <linearGradient id="shape-gradient" x2="1" y2="1">
              <stop offset="40%" stopColor={body1} />
              <stop offset="100%" stopColor={body2} />
            </linearGradient>
            <linearGradient id="thruster-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00d9ff" />
              <stop offset="50%" stopColor="#0099ff" />
              <stop offset="100%" stopColor="#66e0ff" />
            </linearGradient>
          </defs>
        </svg>

        <g>
          <ContentHead>
            <Heads.Initial />
          </ContentHead>

          {Object.entries(Eyes).map(([nameEye, Component]) => {
            return nameEye === eyes ? <Component key={nameEye} /> : null;
          })}

          {Object.entries(Arms).map(([nameArms, Component]) => {
            return nameArms === arms ? <Component key={nameArms} /> : null;
          })}

          <ContentChests>
            <Chests.Initial />
          </ContentChests>

          {/* Propulsor */}
          {thruster && (
            <g className="thrusters">
              {/* Base */}
              <rect x="240" y="440" width="60" height="16" rx="3" fill="#222" />
              <ellipse cx="270" cy="456" rx="24" ry="5" fill="#111" />

              {/* Chamas */}
              <ellipse className="flame f1" cx="270" cy="478" rx="12" ry="28" fill="#005588" />
              <ellipse className="flame f2" cx="270" cy="475" rx="9" ry="22" fill="#0099dd" />
              <ellipse className="flame f3" cx="270" cy="472" rx="6" ry="16" fill="#00ccff" />
              <ellipse className="flame f4" cx="270" cy="468" rx="3" ry="10" fill="#aaeeff" />
            </g>
          )}

          {scarf && (
            <image
              href="/assets/images/cachecol.png"
              x="178"
              y="132"
              width="150"
              style={{ pointerEvents: "none" }}
            />
          )}
        </g>
      </svg>
    </>
  );
};
