import { Initial } from "../../Eyes";
import "./normal.css";

export const Normal = () => {
  return (
    <>
      <svg viewBox="13 -4 500 500" width="100%" height="100%">
        <defs>
          <linearGradient id="shape-gradient" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-stop)" />
            <stop offset="30%" stopColor="var(--color-stop)" />
            <stop offset="100%" stopColor="var(--color-bot)" />
          </linearGradient>
        </defs>

        <g>
          <ellipse id="head" ry="15%" rx="15%" cy="17%" cx="54%"></ellipse>

          <ellipse
            id="shape-central"
            ry="29%"
            rx="20%"
            cy="62%"
            cx="54%"
          ></ellipse>
          <ellipse
            className="arms"
            transform="rotate(13)"
            ry="13%"
            rx="4%"
            cy="45%"
            cx="39%"
          ></ellipse>
          <ellipse
            className="arms"
            transform="rotate(-13)"
            ry="13%"
            rx="4%"
            cy="69%"
            cx="66%"
          ></ellipse>

          <Initial />
        </g>
      </svg>
    </>
  );
};
