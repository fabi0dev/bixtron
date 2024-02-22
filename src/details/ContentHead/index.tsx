import "./style.css";

interface IContentHead {
  children: React.ReactElement;
}
export const ContentHead = ({ children }: IContentHead) => {
  return (
    <>
      <g id="ContentHead">{children}</g>
    </>
  );
};
