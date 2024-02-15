import "./style.scss";

export const Waving = () => {
  return (
    <g id="arms-Waving">
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
