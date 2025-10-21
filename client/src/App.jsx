import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import MarcoPoloParquets from "./pages/parquets/MarcoPoloParquets";
import LunaParquets from "./pages/parquets/LunaParquets";
import YogaParquets from "./pages/parquets/YogaParquets";
import MoodParquets from "./pages/parquets/MoodParquets";
import BellaNeoParquets from "./pages/parquets/BellaNeoParquets";
import AllParquets from "./pages/parquets/AllParquets";
import PolymerPanel from "./pages/panels/PolymerPanel";
import LamPanel from "./pages/panels/LamPanel";
import WallProfile from "./pages/profiles/WallProfile";
import FurnitureProfile from "./pages/profiles/FurnitureProfile";
import AllPanels from "./pages/panels/AllPanels";
import AllProfiles from "./pages/profiles/AllProfiles";
import MyAccount from "./pages/myAccount/MyAccount";
import Cart2Page from "./pages/cart2/CartToPage";
import AdminPage from "./pages/adminPanel/AdminPage";
import { UserProvider } from "./context/UserContext";
import AdminRoute from "./components/routes/AdminRoute";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/parke" element={<AllParquets />} />
          <Route path="/marco-polo" element={<MarcoPoloParquets />} />
          <Route path="/luna" element={<LunaParquets />} />
          <Route path="/yoga" element={<YogaParquets />} />
          <Route path="/mood" element={<MoodParquets />} />
          <Route path="/bella-neo" element={<BellaNeoParquets />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/polimer-panel" element={<PolymerPanel />} />
          <Route path="/lam-panel" element={<LamPanel />} />
          <Route path="/panel" element={<AllPanels />} />
          <Route path="/duvar-profili" element={<WallProfile />} />
          <Route path="/mobilya-profili" element={<FurnitureProfile />} />
          <Route path="/profil" element={<AllProfiles />} />
          <Route path="/hesabım" element={<MyAccount />} />
          <Route path="/sepet" element={<Cart2Page />} />
          <Route path="/admin" element={<AdminRoute element={AdminPage} />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;