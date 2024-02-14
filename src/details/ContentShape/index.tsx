import "./style.css";
import "./scripts";

interface IContentShape {
  children: React.ReactElement;
}
export const ContentShape = ({ children }: IContentShape) => {
  return (
    <>
      <div id="content-shape">
        <div id="content-robot">{children}</div>
        <div id="content-shadow"></div>
      </div>
    </>
  );
};
