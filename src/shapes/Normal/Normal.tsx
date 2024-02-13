import "./normal.css";

export const Normal = () => {
  return (
    <>
      <svg viewBox="13 -4 500 500" width="500" height="500">
        <defs>
          <linearGradient id="shape-gradient" x2="1" y2="1">
            <stop offset="0%" stop-color="var(--color-stop)" />
            <stop offset="30%" stop-color="var(--color-stop)" />
            <stop offset="100%" stop-color="var(--color-bot)" />
          </linearGradient>
        </defs>

        <g>
          <ellipse id="head" ry="14%" rx="14%" cy="17%" cx="54%"></ellipse>

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

          <g transform="translate(4, 78)">
            <ellipse
              className={"eyes eyesCloseAnimate"}
              ry="4%"
              rx="4%"
              cy="0%"
              cx="48%"
            ></ellipse>
            <ellipse
              className={"eyes eyesCloseAnimate"}
              ry="4%"
              rx="4%"
              cy="0%"
              cx="60%"
            ></ellipse>
          </g>
        </g>
      </svg>
    </>
  );
};
