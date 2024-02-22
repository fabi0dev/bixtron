import { useEffect } from "react";
import { interactArmLeft, interactArmRight } from "./script";
import "./style.scss";

export const Initial = () => {
  useEffect(() => {
    interactArmRight();
    interactArmLeft();
  }, []);
  return (
    <g>
      <ellipse id="arm-left" className="arms"></ellipse>
      <ellipse id="arm-right" className="arms"></ellipse>
    </g>
  );
};
