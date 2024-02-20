import "./style.scss";
import { toAccompanyMouse } from "./script";
import { useCallback, useEffect } from "react";

export const Initial = () => {
  const events = useCallback(() => {
    toAccompanyMouse();
  }, []);

  useEffect(() => {
    events();
  }, [events]);

  return (
    <>
      <g id="content-eyes">
        <ellipse className={"eyes"} ry="4%" rx="3%" cy="0%" cx="48%"></ellipse>
        <ellipse className={"eyes"} ry="4%" rx="3%" cy="0%" cx="60%"></ellipse>
      </g>
    </>
  );
};
