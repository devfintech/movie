import ReactDOM from "react-dom/client"
import ReactGA from "react-ga4"

import App from "./app"
import { GA_ID } from "./configs/ga.config"

// Initialize Google Analytics
ReactGA.initialize(GA_ID || "GA_MEASUREMENT_ID")

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<App />)
