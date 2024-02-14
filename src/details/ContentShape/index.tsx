import { initShadow } from "./scripts";
import "./style.css";
import { useCallback, useEffect } from "react";

interface IContentShape {
  children: React.ReactElement;
}
export const ContentShape = ({ children }: IContentShape) => {
  const events = useCallback(() => {
    initShadow();
  }, [initShadow]);

  useEffect(() => {
    events();
  }, []);

  return (
    <>
      <div id="content-shape">
        <div id="content-robot">{children}</div>
        <div id="content-shadow"></div>
      </div>
    </>
  );
};
