import "./style.scss";
import { toAccompanyMouse } from "./script";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectorRobot } from "../../../store/reducers/robot";

const EyeShape = ({ style, fill, cx }: { style: string; fill: string; cx: string }) => {
  switch (style) {
    case "round":
      return <circle fill={fill} className="eyes" r="3.5%" cy="0%" cx={cx} />;
    case "square":
      return (
        <rect
          fill={fill}
          className="eyes"
          width="6%"
          height="6%"
          x={`${parseFloat(cx) - 3}%`}
          y="-3%"
          rx="1%"
        />
      );
    case "star":
      return (
        <polygon
          fill={fill}
          className="eyes"
          points={`${parseFloat(cx) * 5} -18, ${parseFloat(cx) * 5 + 6} -6, ${parseFloat(cx) * 5 + 18} -6, ${parseFloat(cx) * 5 + 9} 4, ${parseFloat(cx) * 5 + 12} 18, ${parseFloat(cx) * 5} 10, ${parseFloat(cx) * 5 - 12} 18, ${parseFloat(cx) * 5 - 9} 4, ${parseFloat(cx) * 5 - 18} -6, ${parseFloat(cx) * 5 - 6} -6`}
        />
      );
    case "heart":
      return (
        <path
          fill={fill}
          className="eyes"
          d={`M ${parseFloat(cx) * 5} 15 C ${parseFloat(cx) * 5 - 20} -5 ${parseFloat(cx) * 5 - 20} -20 ${parseFloat(cx) * 5} -10 C ${parseFloat(cx) * 5 + 20} -20 ${parseFloat(cx) * 5 + 20} -5 ${parseFloat(cx) * 5} 15`}
        />
      );
    case "visor":
      return null;
    case "oval":
    default:
      return <ellipse fill={fill} className="eyes" ry="4%" rx="3%" cy="0%" cx={cx} />;
  }
};

export const Initial = () => {
  const {
    colors: { eyes },
    eyeStyle,
  } = useSelector(selectorRobot);
  
  const events = useCallback(() => {
    toAccompanyMouse();
  }, []);

  useEffect(() => {
    events();
  }, [events]);

  return (
    <>
      <g id="content-eyes">
        {eyeStyle === "visor" ? (
          <rect
            fill={eyes}
            className="eyes visor"
            width="22%"
            height="3%"
            x="43%"
            y="-1.5%"
            rx="1%"
          />
        ) : (
          <>
            <EyeShape style={eyeStyle} fill={eyes} cx="48%" />
            <EyeShape style={eyeStyle} fill={eyes} cx="60%" />
          </>
        )}
      </g>
    </>
  );
};
