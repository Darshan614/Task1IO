import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import "./index.css";
import App from "./App";
import store from "./store/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
let persistor = persistStore(store);
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
