import { useSelector } from "react-redux";
import "./style.scss";
import { selectorRobot } from "../../../store/reducers/robot";

export const Worried = () => {
  const {
    colors: { eyes },
  } = useSelector(selectorRobot);
  return (
    <>
      <svg viewBox="0 0 360 360">
        <g id="worried-eyes">
          <path
            fill={eyes}
            d="M14.1,50.2c0.8-3.2,0.3-6.8,0.2-10.1c-0.1-3.2,0.1-6.7-1.1-9.8c-0.9-2.3-3.6-2.2-4.6,0      c-1.3,3-1.1,6.5-1.3,9.8c-0.2,3.3-0.8,6.8,0,10.1C8.1,53.6,13.3,53.5,14.1,50.2z"
          />
          <path
            fill={eyes}
            d="M54.3,50.2c0.8-3.2,0.3-6.8,0.2-10.1c-0.1-3.2,0.1-6.7-1.1-9.8c-0.9-2.3-3.6-2.2-4.6,0      c-1.3,3-1.1,6.5-1.3,9.8c-0.2,3.3-0.8,6.8,0,10.1C48.3,53.6,53.4,53.5,54.3,50.2z"
          />
          <path
            fill={eyes}
            d="M54.9,73.8c-0.2-2.3-0.1-5.3-0.9-7.6c-1.8-5.1-9.6-3-13.6-2.8c-6.2,0.3-12.5,0.7-18.7,1.1      c-2.9,0.2-5.8,0.4-8.7,0.7c-1.5,0.1-2.9,0.3-4.3,0.5c-1.9,0.3-3.8,1-5.6,1.1c-1.6,0.1-1.6,2.6,0,2.5c1.4,0,2.9,0.3,4.4,0.5      c-0.4,0.4-0.7,1-0.8,1.7c-0.4,2.9-0.8,5.8-1.2,8.7c-0.2,1.8-0.6,3.5,0.4,5.2c1.3,2,3.3,2.1,5.4,2.1c2.7,0,5.4-0.1,8.1-0.1      c11-0.2,22.1-0.2,33.1-0.6c1.7-0.1,3.7-1.5,3.4-3.4C55.5,80.1,55.2,77,54.9,73.8z M30.6,79.8c-3.5,0-7.1,0-10.6,0.1      c-1.7,0-3.3,0-5,0c-0.6,0-1.4,0.1-2.2,0.1c0.1-0.7,0.1-1.3,0.2-2c0.2-1.9,0.4-3.7,0.6-5.6c0.1-1-0.2-1.7-0.8-2.3      c0.7,0,1.4,0,2,0c4,0,7.9,0,11.8-0.1c3.7-0.1,7.5-0.1,11.2-0.2c2.1,0,4.2-0.1,6.2-0.2c1.2,0,2.7-0.3,4-0.3      c0.4,1.9,0.2,4.9,0.3,6.2c0.1,1.4,0.2,2.8,0.4,4.2C42.7,79.7,36.7,79.8,30.6,79.8z"
          />
        </g>
      </svg>
    </>
  );
};
