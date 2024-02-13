import "./App.css";
import { ContentShape } from "./details";
import { shapeReactions } from "./scripts/shape-reactions";
import { Normal } from "./shapes";

import { useEffect } from "react";

function App() {
  useEffect(() => {
    shapeReactions.init();
  }, []);
  return (
    <>
      <div id="robo-container">
        <ContentShape>
          <Normal />
        </ContentShape>
      </div>
    </>
  );
}

export default App;
