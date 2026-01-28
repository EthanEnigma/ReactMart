import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Shop from './pages/Shop';
import Cart from './pages/Cart';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App