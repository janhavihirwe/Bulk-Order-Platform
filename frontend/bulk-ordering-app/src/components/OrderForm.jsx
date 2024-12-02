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
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateFields = () => {
    const newErrors = {};

    
    if (!buyerName.trim()) {
      newErrors.buyerName = "Name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(buyerName)) {
      newErrors.buyerName = "Name should contain only letters and spaces.";
    }

    if (!contactInfo.trim()) {
      newErrors.contactInfo = "Contact information is required.";
    } else if (
      !/^(\+?\d{1,4}[-.\s]?)?(\d{10}|\w+@\w+\.\w+)$/.test(contactInfo)
    ) {
      newErrors.contactInfo = "Enter a valid phone number or email address.";
    }

   
    if (!deliveryAddress.trim()) {
      newErrors.deliveryAddress = "Delivery address is required.";
    } else if (deliveryAddress.trim().length < 10) {
      newErrors.deliveryAddress = "Delivery address should be at least 10 characters long.";
    }

   
    if (!quantity || quantity < 1) {
      newErrors.quantity = "Quantity must be at least 1.";
    }

    setErrors(newErrors);

    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    try {
      await axios.post("https://bulk-order-platform-1.onrender.com/order", {
        buyerName,
        contactInfo,
        deliveryAddress,
        product: product._id,
        quantity,
      });
      toast.success("Order placed successfully!");
      navigate("/orders", { state: { buyerName } });
      onClose();
    } catch (err) {
      console.error("Error placing order:", err.message);
      toast.error("Failed to place the order. Try again.");
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
            <span>{product?.name || "N/A"}</span>
          </div>
          <div className="form-group">
            <label>Price:</label>
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
            {errors.quantity && <p className="error">{errors.quantity}</p>}
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
            {errors.buyerName && <p className="error">{errors.buyerName}</p>}
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
            {errors.contactInfo && <p className="error">{errors.contactInfo}</p>}
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
            {errors.deliveryAddress && <p className="error">{errors.deliveryAddress}</p>}
          </div>
          <div className="button-group">
            <button type="submit" className="submit-button">
              Submit Order
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default OrderForm;
