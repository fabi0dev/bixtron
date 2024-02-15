import { useSelector } from "react-redux";
import "./style.scss";
import { selectorRobot } from "../../../store/reducers/robot";

export const Anger = () => {
  const {
    colors: { eyes },
  } = useSelector(selectorRobot);
  return (
    <>
      <svg viewBox="0 0 340 340">
        <g id="anger-eyes">
          <path
            fill={eyes}
            className="anger-eyes"
            d="M66.3,30.9c1.9-2,3.8-4.1,5.6-6.2c1.8-2,3.9-4.1,5.2-6.5c1.9-3.5-2.5-6.6-5.4-4.2c-2.1,1.8-3.7,4.3-5.3,6.5    c-1.7,2.2-3.4,4.5-5,6.8C59.6,30.1,63.9,33.3,66.3,30.9L66.3,30.9z"
          />
          <path
            fill={eyes}
            className="anger-eyes"
            d="M31.1,27.2c-1.6-2.3-3.3-4.5-5-6.8c-1.6-2.2-3.2-4.7-5.3-6.5c-2.9-2.5-7.3,0.6-5.4,4.2    c1.3,2.4,3.4,4.5,5.2,6.5c1.9,2.1,3.7,4.2,5.6,6.2C28.7,33.3,33.1,30.1,31.1,27.2L31.1,27.2z"
          />
          <path
            fill={eyes}
            className="anger-eyes"
            d="M34.4,53.2c1.6-0.8,2.5-2.3,3.9-3.4c1.8-1.4,3.7-2.2,6-2.5c4.1-0.4,8.7,1.1,10.2,5.3c0.9,2.7,5.6,2.5,5.3-0.7    c-0.6-6.9-8.1-10.5-14.4-10.4c-5.1,0.1-14.8,4.2-13.2,10.8C32.4,53.3,33.5,53.6,34.4,53.2L34.4,53.2z"
          />
        </g>
      </svg>
    </>
  );
};
