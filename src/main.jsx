import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
      <App />
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#FFFDC1",
            color: "#000",
            fontSize: "14px",
            duration: 4000,
            minWidth: "300px",
          },
        }}
      />
    </>
  </StrictMode>
);
