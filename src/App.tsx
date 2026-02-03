import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart products={[]} onUpdateQuantity={() => {}} onRemove={() => {}} />} />
          <Route path='/product/:id' element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
