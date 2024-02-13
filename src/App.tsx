import "./App.css";
import { ContentShape } from "./details";
import { Initial } from "./shapes/Body";
import { useEffect, useRef } from "react";
import { shapeReactions } from "./scripts/shape-reactions";

function App() {
  const initApp = useRef(false);
  useEffect(() => {
    if (initApp.current == true) {
      return;
    }

    if (initApp.current == false) {
      shapeReactions.init();
      initApp.current = true;
    }
    return () => {};
  }, []);

  return (
    <>
      <div id="robo-container">
        <ContentShape>
          <Initial />
        </ContentShape>
      </div>
    </>
  );
}

export default App;
