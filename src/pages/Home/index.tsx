import { useCallback, useEffect } from "react";
import { ContentShape } from "../../details";
import { shapeReactions } from "../../scripts/shape-reactions";
import { Initial } from "../../shapes/Body";
import * as Icons from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import { selectorRobot } from "../../store/reducers/robot";
import "./style.scss";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  const {
    colors: { eyes, body1 },
  } = useSelector(selectorRobot);

  const events = useCallback(() => {
    setTimeout(() => {
      shapeReactions.init();
    }, 100);
  }, []);

  useEffect(() => {
    events();
  }, [events]);

  return (
    <>
      <div id="container-home">
        <div id="menu">
          <div
            className="item"
            onClick={() => {
              navigate("/config");
            }}
          >
            <Icons.Cog8ToothIcon
              stroke={eyes}
              fill={body1}
              className="h-10 w-10"
            />
          </div>
        </div>
        <div id="robo-container">
          <ContentShape>
            <Initial />
          </ContentShape>
        </div>
      </div>
    </>
  );
}
