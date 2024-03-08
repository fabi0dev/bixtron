import "./index.scss";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import Routers from "./routers";
import * as Icons from "@heroicons/react/24/solid";

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routers />
        </PersistGate>

        <div className="fixed bottom-6 right-6">
          <a
            href="https://fabioalves.site/"
            title="Desenvolvido por Fábio Alves"
            target="_blank"
          >
            <Icons.FireIcon className="h-8 w-8 fill-emerald-300 transition-all hover:scale-150 cursor-pointer" />
          </a>
        </div>
      </Provider>
    </>
  );
}

export default App;
