import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {AppKitProvider} from  "./web3/AppKitProvider.jsx"


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppKitProvider>
      <App />
    </AppKitProvider>
  </React.StrictMode>
);
