import * as Heads from "../../Heads";
import * as Eyes from "../../Eyes";
import * as Chests from "../../Chests";
import * as Arms from "../../Arms";
import "./style.scss";
import { ContentChests, ContentHead } from "../../../details";
import { useDispatch, useSelector } from "react-redux";
import { selectorRobot, setArms, setEye } from "../../../store/reducers/robot";

export const Initial = () => {
  const dispatch = useDispatch();
  const {
    eyes,
    arms,
    colors: { body1, body2 },
  } = useSelector(selectorRobot);

  return (
    <>
      <button onClick={() => dispatch(setArms("Waving"))}>Novos olhos</button>
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

          {Object.entries(Arms).map(([nameArms, Component], index) => {
            return nameArms == arms ? (
              <Component key={index} />
            ) : (
              <div key={index}></div>
            );
          })}

          <ContentChests>
            <Chests.Initial />
          </ContentChests>
        </g>
      </svg>
    </>
  );
};
