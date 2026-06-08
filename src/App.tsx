import { Route, Routes, useLocation } from "react-router-dom";
import { InicioPage } from "./components/pages/inicio";
import { FavoritosPage } from "./components/pages/favoritos";
import { SobrePage } from "./components/pages/sobre";
import { NavigationMobile } from "./components/navigationMobile";
import { LoginPage } from "./components/pages/login";
import { PlaceDetailModal } from "./components/modals/PlaceDetailModal";


function App() {

  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      <Routes>
        <Route path="/" element={<InicioPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/favoritos" element={<FavoritosPage />} />
        <Route path="/sobre" element={<SobrePage />} />
      </Routes>
      {pathname !== '/login' && <NavigationMobile />}
      <PlaceDetailModal />
    </>
  )
}

export default App;