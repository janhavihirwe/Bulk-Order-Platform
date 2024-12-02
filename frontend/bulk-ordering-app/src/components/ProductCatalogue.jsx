import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal';
import OrderForm from './OrderForm';
import { useNavigate } from "react-router-dom";
import HomeSlider from './HomeSlider';
import { toast } from 'react-toastify';



function ProductCatalogue() {
  const [products, setProducts] = useState([]);  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);   
  const [error, setError] = useState(null);     
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); 

  const handleAddToCart = (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Navigate to login if the user is not logged in
      toast.warning("Login to Proceed")
      navigate("/login");
    } else {
      // Open the modal for adding product to cart
      console.log(token)
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  };
  
  const handleLogout = () => {
    // Remove token from localStorage and update state
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.success("LogOut Succesfully!")
    navigate("/login");
  };

  const closeModal = () => {
    setIsModalOpen(false);  
    setSelectedProduct(null);  
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    axios.get("https://bulk-order-platform-1.onrender.com/product")  
      .then(response => {
        setProducts(response.data);  
        setLoading(false);            
      })
      .catch(error => {
        setError('Error fetching products');
        setLoading(false);        
      });
  }, []);

  if (loading) {
    return <p>Loading products...</p>; 
  }

  if (error) {
    return <p>{error}</p>; 
  }
  return (
    <div style={{width:"100%"}}>
      <div
  style={{
    background: "#4caf50",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
    borderRadius: "2px",
    height: "80px",
  }}
>
  <h1 style={{ flex: "1", textAlign: "center", marginLeft: 125 }}>
    Bulk Ordering Platform
  </h1>
  <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
    <div
      style={{
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
      }}
      onClick={() => navigate("/orders")}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
        alt="Cart Icon"
        style={{ width: "30px", height: "30px" }}
      />
    </div>
    {isLoggedIn ? (
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
              onClick={handleLogout}
              title="Logout"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/126/126467.png"
                alt="Logout Icon"
                style={{ width: "30px" }}
              />
            </div>
          ) : (
            <>
              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => navigate("/login")}
                title="Login"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/891/891399.png"
                  alt="Login Icon"
                  style={{ width: "30px", height: "30px" }}
                />
              </div>
            </>
          )}
  </div>
</div>

      <HomeSlider/>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
        padding: '25px',
      }}>
        {products.map((product) => (
          <div 
            key={product._id}  
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '10px',
              width: '200px',
              textAlign: 'center',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
            }}
          >
            <img 
              src={product.imgURL}  
              alt={product.name} 
              style={{
                width: '100%',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '5px',
              }} 
            />
            <h3 style={{ margin: '10px 0 5px' }}>{product.name}</h3>
            <p style={{ color: '#555' }}>₹{product.pricePerUnit} per unit</p>
            <button 
              style={{
                background: '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '5px 10px',
                cursor: 'pointer',
              }}
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
          ))}
      </div>
      
      <Modal isOpen={isModalOpen} onClose={closeModal}>
  {/* Check if a product is selected before rendering the order form */}
  {selectedProduct ? (
    <OrderForm
      product={selectedProduct} // Pass the selected product as a prop
      onClose={closeModal} // Close modal when form submission is successful
    />
  ) : (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <p>No product selected!</p>
      <button onClick={closeModal} style={{ marginTop: "10px" }}>
        Close
      </button>
    </div>
  )}
</Modal>

   </div>
  )
}

export default ProductCatalogue