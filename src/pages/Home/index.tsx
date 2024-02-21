import { useCallback, useEffect } from "react";
import { ContentShape } from "../../details";
import { shapeReactions } from "../../scripts/shape-reactions";
import { Initial } from "../../shapes/Body";

export default function Home() {
  const events = useCallback(() => {
    setTimeout(() => {
      shapeReactions.init();
    }, 200);
  }, []);

  useEffect(() => {
    events();
  }, [events]);

  return (
    <>
      <div id="container-home">
        <div id="robo-container">
          <ContentShape>
            <Initial />
          </ContentShape>
        </div>
      </div>
    </>
  );
}
