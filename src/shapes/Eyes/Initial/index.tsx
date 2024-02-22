import "./style.scss";
import { toAccompanyMouse } from "./script";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectorRobot } from "../../../store/reducers/robot";

export const Initial = () => {
  const {
    colors: { eyes },
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
        <ellipse
          fill={eyes}
          className={"eyes"}
          ry="4%"
          rx="3%"
          cy="0%"
          cx="48%"
        ></ellipse>
        <ellipse
          fill={eyes}
          className={"eyes"}
          ry="4%"
          rx="3%"
          cy="0%"
          cx="60%"
        ></ellipse>
      </g>
    </>
  );
};
