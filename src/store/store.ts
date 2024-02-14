import { combineReducers, configureStore } from "@reduxjs/toolkit";
import robot from "./reducers/robot";
import localforage from "localforage";
import { persistReducer, persistStore } from "redux-persist";

const currencyPersistConfig = {
  key: "bixtron",
  storage: localforage,
  safelist: ["robot"],
};

const all = combineReducers({
  robot,
});

const reducers = persistReducer(currencyPersistConfig, all);

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);
export { store, persistor };
