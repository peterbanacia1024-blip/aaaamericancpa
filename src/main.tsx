import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import logo from './assets/logo.png';

const favicon = document.getElementById('favicon') as HTMLLinkElement;
favicon.href = logo;

createRoot(document.getElementById("root")!).render(<App />);
