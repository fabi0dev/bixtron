import { useSelector } from "react-redux";
import "./style.scss";
import { selectorRobot } from "../../../store/reducers/robot";

export const Dizzy = () => {
  const {
    colors: { eyes },
  } = useSelector(selectorRobot);
  return (
    <>
      <svg viewBox="0 0 360 360">
        <g id="dizzy-eyes">
          <path
            fill={eyes}
            d="M36.9,36.5c0.2-2.7-1.8-4.5-3.4-6.5c-0.9-1.1-1.8-2.2-2.7-3.3c1.8-1.8,3.7-3.5,5.5-5.4    c2.9-2.9-1.5-7.3-4.5-4.5c-1.8,1.7-3.6,3.5-5.3,5.3c-2.6-2.4-5.6-4.7-9-5.4c-2.3-0.5-4.1,2.3-2.3,4c2.2,2.2,4.6,4.1,6.8,6.2    c0,0,0,0,0,0c-2.8,3-6.2,6.3-7.7,10.2c-0.7,1.7,1.5,2.9,2.8,2.2c3.4-1.8,6.2-5.1,8.9-7.9c0.9,1.2,1.8,2.4,2.6,3.6    c0.4,0.6,1.8,2.6,1.8,2.5C33.5,41.4,36.7,38.6,36.9,36.5z"
          />
          <path
            fill={eyes}
            d="M72.1,16.8c-1.8,1.7-3.6,3.5-5.3,5.3c-2.6-2.4-5.6-4.7-9-5.4c-2.3-0.5-4.1,2.3-2.3,4c2.2,2.2,4.6,4.1,6.8,6.2    c0,0,0,0,0,0c-2.8,3-6.2,6.3-7.7,10.2c-0.7,1.7,1.5,2.9,2.8,2.2c3.4-1.8,6.2-5.1,8.9-7.9c0.9,1.2,1.8,2.4,2.6,3.6    c3.9,5.8,8.1,3.6,8.3,1.5c0.2-2.7-1.8-4.5-3.4-6.5c-0.9-1.1-1.8-2.2-2.7-3.3c1.8-1.8,3.7-3.5,5.5-5.4C79.4,18.4,75,14,72.1,16.8z"
          />
        </g>
      </svg>
    </>
  );
};