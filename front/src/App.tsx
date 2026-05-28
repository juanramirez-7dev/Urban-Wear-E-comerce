import { Routes, Route } from "react-router"

import MainLayout from "./layouts/MainLayout"
import AdminLayout from "./layouts/AdminLayout"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import ProductDetail from "./pages/ProductDetail"
import ShopPage from "./pages/ShopPage"
import CartPage from "./pages/CartPage"
import CheckoutPage from "./pages/CheckoutPage"
import BillPage from "./pages/BillPage"
import { ProtectedRoute } from "./components/auth/ProtectedRoute"
import AdminInventory from "./pages/admin/AdminInventory"
import AdminCreateProduct from "./pages/admin/AdminCreateProduct"
import AdminOrders from "./pages/admin/AdminOrders.tsx"
import ClientLayout from "./layouts/ClientLayout"
import ClientOrders from "./pages/client/ClientOrders"
import ClientProfile from "./pages/client/ClientProfile"

function App() {
  return (
    <Routes>
      <Route path="/" element={ <MainLayout/> } >
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/bill/:id" element={<BillPage />} />
      </Route>
      <Route element={<ProtectedRoute roles={["Admin"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminOrders />} />
          <Route path="inventory" element={<AdminInventory />} />
          <Route path="inventory/create" element={<AdminCreateProduct />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute roles={["Cliente"]} />}>
        <Route path="/cliente" element={<ClientLayout />}>
          <Route index element={<ClientProfile />} />
          <Route path="orders" element={<ClientOrders />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
