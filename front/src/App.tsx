import { Routes, Route } from "react-router"

import MainLayout from "./layouts/MainLayout"
import LandingPage from "./pages/LandingPage"
import ProductDetail from "./pages/ProductDetail"

function App() {
  return (
    <Routes>
      <Route path="/" element={ <MainLayout/> } >
        <Route index element={<LandingPage />} />
        <Route path="/product" element={<ProductDetail />} />
      </Route>
    </Routes>
  )
}

export default App
