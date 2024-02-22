import "./style.css";

interface IContentChests {
  children: React.ReactElement;
}
export const ContentChests = ({ children }: IContentChests) => {
  return (
    <>
      <g id="ContentChests">{children}</g>
    </>
  );
};
