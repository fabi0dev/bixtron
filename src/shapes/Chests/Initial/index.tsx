export const Initial = () => {
  return (
    <g>
      <ellipse id="shape-central" ry="29%" rx="20%" cy="62%" cx="54%"></ellipse>
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
    </g>
  );
};
