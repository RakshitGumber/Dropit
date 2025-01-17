import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./providers";
import App from "./App";
import { ReactFlowProvider } from "@xyflow/react";
import "./index.css";

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ThemeProvider defaultTheme="dark">
        <ReactFlowProvider>
          <App />
        </ReactFlowProvider>
      </ThemeProvider>
    </StrictMode>
  );
}
