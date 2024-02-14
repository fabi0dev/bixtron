import * as Heads from "../../Heads";
import * as Eyes from "../../Eyes";
import * as Chests from "../../Chests";
import "./style.css";
import { ContentChests, ContentHead } from "../../../details";

export const Initial = () => {
  return (
    <>
      <svg viewBox="0 -4 500 500" width="100%" height="100%">
        <defs>
          <linearGradient id="shape-gradient" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-stop)" />
            <stop offset="30%" stopColor="var(--color-stop)" />
            <stop offset="100%" stopColor="var(--color-bot)" />
          </linearGradient>
        </defs>

        <g>
          <ContentHead>
            <Heads.Initial />
          </ContentHead>

          <Eyes.Initial />

          <ContentChests>
            <Chests.Initial />
          </ContentChests>
        </g>
      </svg>
    </>
  );
};
