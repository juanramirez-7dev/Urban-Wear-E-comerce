import { Routes, Route } from "react-router"

import MainLayout from "./layouts/MainLayout"
import AdminLayout from "./layouts/AdminLayout"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import ProductDetail from "./pages/ProductDetail"
import ShopPage from "./pages/ShopPage"
import CartPage from "./pages/CartPage"
import CheckoutPage from "./pages/CheckoutPage"
import { ProtectedRoute } from "./components/auth/ProtectedRoute"
import AdminInventory from "./pages/admin/AdminInventory"

function App() {
  return (
    <Routes>
      <Route path="/" element={ <MainLayout/> } >
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Route>
      <Route element={<ProtectedRoute roles={["Admin"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="inventory" element={<AdminInventory />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
