import { Routes, Route } from "react-router"

import MainLayout from "./layouts/MainLayout"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import ProductDetail from "./pages/ProductDetail"
import ShopPage from "./pages/ShopPage"
import CartPage from "./pages/CartPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={ <MainLayout/> } >
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>
    </Routes>
  )
}

export default App
