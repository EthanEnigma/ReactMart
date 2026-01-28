import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Shop from './pages/Shop';
import Cart from './pages/Cart';

function App() {
  return (
    <div>
      <header className="app-header">
        <h1>React Mart</h1>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  )
}

export default App