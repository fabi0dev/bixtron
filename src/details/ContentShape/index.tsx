import { initShadow } from "./scripts";
import "./style.css";
import { useEffect } from "react";

interface IContentShape {
  children: React.ReactElement;
  className?: string;
}
export const ContentShape = ({ children, ...props }: IContentShape) => {
  useEffect(() => {
    const shadow = initShadow();

    return () => {
      shadow.unsubscribe();
    };
  }, []);

  return (
    <>
      <div id="content-shape" {...props}>
        <div id="content-robot">{children}</div>
        <div id="content-shadow"></div>
      </div>
    </>
  );
};
