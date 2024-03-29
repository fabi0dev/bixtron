import { useSelector } from "react-redux";
import "./style.scss";
import { selectorRobot } from "../../../store/reducers/robot";

export const Bored = () => {
  const {
    colors: { eyes },
  } = useSelector(selectorRobot);
  return (
    <>
      <svg viewBox="0 0 360 360">
        <g id="bored-eyes">
          <path
            fill={eyes}
            d="M24.8,30.9c0,0.8,0,1.6,0,2.4c0,2.6-0.2,5.3,0.3,7.9c0.6,3.3,5.4,2.3,5.6-0.8c0.1-2.1-0.3-4.2-0.4-6.2     c-0.1-1-0.1-1.9-0.2-2.9c0-0.2,0-0.3-0.1-0.5c2.2,0,4.3-0.1,6.4-0.5c2.8-0.5,2.9-5.4,0-5.8c-4.1-0.6-8.3-0.1-12.5,0     c-4,0.1-8.5,0-12.2,1.4c-2,0.7-2.2,3.6,0,4.2C15.6,31.3,20,31,24,30.9C24.3,30.9,24.6,30.9,24.8,30.9z"
          />
          <path
            fill={eyes}
            d="M78.3,24.5c-4.1-0.6-8.3-0.1-12.5,0c-4,0.1-8.5,0-12.2,1.4c-2,0.7-2.2,3.6,0,4.2c3.8,1.2,8.3,0.9,12.2,0.8     c0.3,0,0.6,0,0.8,0c0,0.8,0,1.6,0,2.4c0,2.6-0.2,5.3,0.3,7.9c0.6,3.3,5.4,2.3,5.6-0.8c0.1-2.1-0.3-4.2-0.4-6.2     c-0.1-1-0.1-1.9-0.2-2.9c0-0.2,0-0.3-0.1-0.5c2.2,0,4.3-0.1,6.4-0.5C81.1,29.8,81.2,24.9,78.3,24.5z"
          />
        </g>
      </svg>
    </>
  );
};
