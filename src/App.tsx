import "./App.css";
import { ContentShape } from "./details";
import { Normal } from "./shapes";

function App() {
  return (
    <>
      <div className="robo-container">
        <ContentShape>
          <Normal />
        </ContentShape>
      </div>
    </>
  );
}

export default App;
