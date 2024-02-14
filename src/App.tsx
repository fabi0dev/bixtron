import { ContentShape } from "./details";
import { Initial } from "./shapes/Body";
import { useCallback, useEffect, useState } from "react";
import { shapeReactions } from "./scripts/shape-reactions";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
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
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
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
