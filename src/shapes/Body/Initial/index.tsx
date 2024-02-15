import * as Heads from "../../Heads";
import * as Eyes from "../../Eyes";
import * as Chests from "../../Chests";
import * as Arms from "../../Arms";
import "./style.css";
import { ContentChests, ContentHead } from "../../../details";
import { useDispatch, useSelector } from "react-redux";
import { selectorRobot, setEye } from "../../../store/reducers/robot";

export const Initial = () => {
  const dispatch = useDispatch();
  const {
    eyes,
    colors: { body1, body2 },
  } = useSelector(selectorRobot);

  return (
    <>
      <button onClick={() => dispatch(setEye("Bored"))}>Novos olhos</button>
      <svg viewBox="0 -4 500 500" width="100%" height="100%">
        <svg>
          <defs>
            <linearGradient id="shape-gradient" x2="1" y2="1">
              <stop offset="0%" stopColor={body1} />
              <stop offset="30%" stopColor={body1} />
              <stop offset="100%" stopColor={body2} />
            </linearGradient>
          </defs>
        </svg>

        <g>
          <ContentHead>
            <Heads.Initial />
          </ContentHead>

          {Object.entries(Eyes).map(([nameEye, Component], index) => {
            return nameEye == eyes ? (
              <Component key={index} />
            ) : (
              <div key={index}></div>
            );
          })}

          <Arms.Initial />

          <ContentChests>
            <Chests.Initial />
          </ContentChests>
        </g>
      </svg>
    </>
  );
};
