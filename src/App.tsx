import "./index.scss";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import Routers from "./routers";

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routers />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
