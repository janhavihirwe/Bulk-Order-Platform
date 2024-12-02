import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function InventoryManagement() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", imgURL: "", pricePerUnit: "" });
  const [editProduct, setEditProduct] = useState(null);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://bulk-order-platform-1.onrender.com/inventory");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    try {
      await axios.post("https://bulk-order-platform-1.onrender.com/inventory", newProduct, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Product Added Successfully!")
      fetchProducts();
      setNewProduct({ name: "", imgURL: "", pricePerUnit: "" });
    } catch (err) {
      console.error("Error adding product", err);
    }
  };

  const handleEditProduct = async () => {
    try {
      await axios.put(
        `https://bulk-order-platform-1.onrender.com/inventory/${editProduct._id}`,
        editProduct,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      toast.success("Product Updated Successfully!")
      fetchProducts();
      setEditProduct(null);
    } catch (err) {
      console.error("Error editing product", err);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      console.log("Deleting product",id)
      await axios.delete(`https://bulk-order-platform-1.onrender.com/inventory/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Product Deleted Successfully!")
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product", err);
    }
  };

  const handleLogout = () => {
    // Remove token from localStorage and update state
    localStorage.removeItem("token");
    toast.success("LogOut Succesfully!")
    navigate("/login");
  };

  return (
    <div>
      <div style={{background:"#4caf50", color: 'white', padding: '3px', borderRadius: '2px',display:"flex",height:"60px",alignItems:"center"}}>
      <FaHome style={{marginLeft:"30px",fontSize: '30px', cursor: 'pointer'}} onClick={() => navigate("/")} />
      <h1 style={{margin:"auto"}}>Bulk Ordering Platform</h1>
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
      </div>
      <h1>Inventory Management</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.imgURL}
          onChange={(e) => setNewProduct({ ...newProduct, imgURL: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price Per Unit"
          value={newProduct.pricePerUnit}
          onChange={(e) => setNewProduct({ ...newProduct, pricePerUnit: e.target.value })}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      {editProduct && (
        <div>
          <input
            type="text"
            placeholder="Name"
            value={editProduct.name}
            onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={editProduct.imgURL}
            onChange={(e) => setEditProduct({ ...editProduct, imgURL: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price Per Unit"
            value={editProduct.pricePerUnit}
            onChange={(e) => setEditProduct({ ...editProduct, pricePerUnit: e.target.value })}
          />
          <button onClick={handleEditProduct}>Save Changes</button>
          <button onClick={() => setEditProduct(null)}>Cancel</button>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "16px",
          marginTop: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "16px",
              textAlign: "center",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src={product.imgURL}
              alt={product.name}
              style={{ width: "100%", height: "60%", borderRadius: "4px" }}
            />
            <h3 style={{ margin: "12px 0 8px", fontSize: "18px" }}>{product.name}</h3>
            <p style={{ fontSize: "16px", color: "#333" }}>Rs.{product.pricePerUnit}</p>
            <button
              onClick={() => setEditProduct(product)}
              style={{
                marginTop: "8px",
                marginRight: "4px",
                padding: "8px 12px",
                border: "none",
                borderRadius: "4px",
                backgroundColor: "#007bff",
                color: "white",
                cursor: "pointer",
              }}
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteProduct(product._id)}
              style={{
                marginTop: "8px",
                padding: "8px 12px",
                border: "none",
                borderRadius: "4px",
                backgroundColor: "#dc3545",
                color: "white",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InventoryManagement;
