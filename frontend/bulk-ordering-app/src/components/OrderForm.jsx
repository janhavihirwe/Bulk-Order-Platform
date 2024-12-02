import React, { useState } from "react";
import axios from "axios";
import "./OrderForm.css";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OrderForm = ({ product, onClose }) => {
  const [buyerName, setBuyerName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://bulk-order-platform-1.onrender.com/order", {
        buyerName,
        contactInfo,
        deliveryAddress,
        product: product._id,
        quantity,
      });
      toast.success("Order placed successfully!");
      navigate('/orders', { state: { buyerName } });
      onClose();
    } catch (err) {
      console.error("Error placing order:", err.message);
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
            <label>
              Product:
            </label>
            <span>{product?.name || "N/A"}</span>
          </div>
          <div className="form-group">
            <label>
              Price:
            </label>
            <span>${product?.pricePerUnit || "N/A"}</span>
          </div>
          <div className="form-group">
            <label>
              Quantity: <span className="required">*</span>
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              required
            />
          </div>
          <div className="form-group">
            <label>
              Buyer Name: <span className="required">*</span>
            </label>
            <input
              type="text"
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>
              Contact Info: <span className="required">*</span>
            </label>
            <input
              type="text"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>
              Delivery Address: <span className="required">*</span>
            </label>
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
      <ToastContainer />
    </div>
  );
};

export default OrderForm;
