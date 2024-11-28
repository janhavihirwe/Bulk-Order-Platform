import React, { useState } from "react";
import axios from "axios";
import "./OrderForm.css";
import { toast, ToastContainer } from "react-toastify";

const OrderForm = ({ product, onClose }) => {
  const [buyerName, setBuyerName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://bulk-order-platform.onrender.com/order", {
        buyerName,
        contactInfo,
        deliveryAddress,
        product: product._id,
        quantity,
      });
      // <ToastContainer/>
      toast.success("Order placed successfully!");
      onClose();
    } catch (err) {
      alert("Error placing order:", err.message);
    }
  };

  return (
    <div className="overlay">
      <div className="order-form">
        <button className="close-button" onClick={onClose}>
          ✖
        </button>
        <h2>Order Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product:</label>
            <span>{product.name}</span>
          </div>
          <div className="form-group">
            <label>Price:</label>
            <span>${product.pricePerUnit}</span>
          </div>
          <div className="form-group">
            <label>Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
            />
          </div>
          <div className="form-group">
            <label>Buyer Name:</label>
            <input
              type="text"
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Contact Info:</label>
            <input
              type="text"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Delivery Address:</label>
            <textarea
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="button-group">
            <button type="submit" className="submit-button">
              Submit Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
