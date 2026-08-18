import React from "react";
import { createRoot } from "react-dom/client";
import { NotificationProvider } from "./context/NotificationContext";
import App from "./App";

import "./styles/global.css";

createRoot(document.getElementById("root")).render(

    <React.StrictMode>
<NotificationProvider>
        <App />
</NotificationProvider>
    </React.StrictMode>

);