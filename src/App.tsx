import { Route, Routes } from "react-router-dom";
import { InicioPage } from "./components/pages/inicio";
import { FavoritosPage } from "./components/pages/favoritos";
import { SobrePage } from "./components/pages/sobre";
import { NavigationMobile } from "./components/navigationMobile";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<InicioPage />} />
        <Route path="/favoritos" element={<FavoritosPage />} />
        <Route path="/sobre" element={<SobrePage />} />
      </Routes>
      <NavigationMobile />
    </>
  )
}

export default App;