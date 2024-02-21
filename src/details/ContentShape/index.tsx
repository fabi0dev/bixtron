import { useSelector } from "react-redux";
import { initShadow } from "./scripts";
import "./style.css";
import { useCallback, useEffect } from "react";
import { selectorRobot } from "../../store/reducers/robot";

interface IContentShape {
  children: React.ReactElement;
  className?: string;
}
export const ContentShape = ({ children, ...props }: IContentShape) => {
  const events = useCallback(() => {
    initShadow();
  }, []);

  useEffect(() => {
    events();
  }, [events]);

  return (
    <>
      <div id="content-shape" {...props}>
        <div id="content-robot">{children}</div>
        <div id="content-shadow"></div>
      </div>
    </>
  );
};
