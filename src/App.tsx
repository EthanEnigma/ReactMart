import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App
