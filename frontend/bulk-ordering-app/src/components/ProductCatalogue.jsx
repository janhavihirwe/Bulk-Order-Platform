import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal';
import OrderForm from './OrderForm';
import { useNavigate } from "react-router-dom";


function ProductCatalogue() {
  const [products, setProducts] = useState([]);  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);   
  const [error, setError] = useState(null);     
  const navigate = useNavigate(); 

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);  
  };
  
  const closeModal = () => {
    setIsModalOpen(false);  
    setSelectedProduct(null);  
  };

  useEffect(() => {
    axios.get("https://bulk-order-platform.onrender.com/product")  
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
      <div style={{background:"#4caf50", color: 'white', padding: '3px', borderRadius: '2px',display:"flex",justifyContent:"space-evenly"}}>
        <h1 style={{marginLeft:"40px"}}>Bulk Ordering Platform</h1>
        <div
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          marginRight:"10px"
        }}
        onClick={() => navigate("/orders")}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
          alt="Cart Icon"
          style={{ width: "30px", height: "30px" }}
        />
      </div>
      <div
            style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
            onClick={() => navigate("/login")}
            title="Login"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/891/891399.png"
              alt="Login Icon"
              style={{ width: "30px", height: "30px" }}
            />
      </div>
      <div style={{ cursor: "pointer", display: "flex", alignItems: "center" }} onClick={() => navigate("/signup")} title="Sign Up">
    <img src="https://cdn-icons-png.flaticon.com/512/1233/1233896.png" alt="Sign Up Icon" style={{ width: "30px" }} />
  </div>
      </div> 
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
        padding: '20px',
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