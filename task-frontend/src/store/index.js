import rootReducer, { history } from "../reducers";
import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import { createBrowserHistory } from "history";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"]
};

const logger = createLogger({
  collapsed: true
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  connectRouter(history)(persistedReducer),
  composeWithDevTools(applyMiddleware(routerMiddleware(history), logger, thunk))
);

export const persistor = persistStore(store);
