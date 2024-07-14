import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import UserContextProvider from "./context/UserContext.tsx";
import { LinearProgress } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <Suspense fallback={<LinearProgress color="secondary" />}>
          <App />
        </Suspense>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
