import { useCallback, useEffect } from "react";
import { shapeReactions } from "./scripts/shape-reactions";
import "./index.scss";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import Routers from "./routers";
import { ContentShape } from "./details";
import { Initial } from "./shapes/Body";

function App() {
  const events = useCallback(() => {
    setTimeout(() => {
      shapeReactions.init();
    }, 500);
  }, []);

  useEffect(() => {
    events();
  }, [events]);
  useEffect(() => {}, []);

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <Routers /> */}
          <div id="robo-container">
            <ContentShape>
              <Initial />
            </ContentShape>
          </div>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
