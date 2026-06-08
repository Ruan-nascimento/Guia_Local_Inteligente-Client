import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./providers/AuthProvider"
import { ModalProvider } from "./providers/ModalProvider"
import App from "./App"
import "./index.css"

import { FavoritesProvider } from "./providers/FavoritesProvider"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FavoritesProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </FavoritesProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)