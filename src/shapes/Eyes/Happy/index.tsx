import { useSelector } from "react-redux";
import "./style.scss";
import { selectorRobot } from "../../../store/reducers/robot";

export const Happy = () => {
  const {
    colors: { eyes },
  } = useSelector(selectorRobot);

  return (
    <>
      <g transform="translate(-14, 30)">
        <svg viewBox="0 0 320 320">
          <g>
            <path
              fill={eyes}
              className="eyeHappy"
              d="M25.6,31.7c2.1,2.1,4.2,4.2,6.2,6.5c3,3.4,8.4-2.1,5-5c-3.2-2.7-6.1-5.7-9.2-8.5c-1.5-1.5-3.8-1.1-5,0.6    c-2.5,3.8-5.4,7-8.8,10c-1.7,1.4,0.1,4.6,2.2,3.8C19.8,37.6,23,34.8,25.6,31.7z"
            ></path>
            <path
              fill={eyes}
              className="eyeHappy"
              d="M67.4,24.7c-1.5-1.5-3.8-1.1-5,0.6c-2.5,3.8-5.4,7-8.8,10c-1.7,1.4,0.1,4.6,2.2,3.8c3.8-1.5,6.9-4.3,9.6-7.4    c2.1,2.1,4.2,4.2,6.2,6.5c3,3.4,8.4-2.1,5-5C73.3,30.5,70.4,27.5,67.4,24.7z"
            ></path>
          </g>
        </svg>
      </g>
    </>
  );
};
