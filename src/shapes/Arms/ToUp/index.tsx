import "./style.scss";

export const ToUp = () => {
  return (
    <g id="arms-ToUp">
      <ellipse className="arms" id="arm-left" ry="13%" rx="4%"></ellipse>

      <ellipse
        className="arms"
        id="arm-right"
        transform="rotate(-13)"
        ry="13%"
        rx="4%"
      ></ellipse>
    </g>
  );
};
