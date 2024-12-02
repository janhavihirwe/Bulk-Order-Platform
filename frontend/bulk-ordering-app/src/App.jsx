import './App.css'
import Orders from './components/Orders';
import ProductCatalogue from './components/ProductCatalogue'
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import InventoryManagement from './components/InventoryManagement';
import SignUp from './components/SignUp';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<ProductCatalogue />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/login" element={<Login />} />
      <Route
          path="/inventory"
          element={

              <InventoryManagement />
  
          }
      />
      <Route path="/signup" element={<SignUp />} />
      
    </Routes>
    <ToastContainer/>
    
  </>
  )
}

export default App
