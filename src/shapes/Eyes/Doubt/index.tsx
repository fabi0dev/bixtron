import { useSelector } from "react-redux";
import "./style.scss";
import { selectorRobot } from "../../../store/reducers/robot";
import { useEffect } from "react";
import { toGrowEye } from "./script";

export const Doubt = () => {
  const {
    colors: { eyes },
  } = useSelector(selectorRobot);

  useEffect(() => {
    toGrowEye();
  }, []);

  return (
    <>
      <g id="doubt-eyes">
        <ellipse fill={eyes} cx="48%" id="doubt-eyes-left"></ellipse>
        <ellipse fill={eyes} cx="60%" id="doubt-eyes-right"></ellipse>
      </g>
    </>
  );
};
