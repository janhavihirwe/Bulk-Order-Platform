import React, { useState, useEffect } from "react";
import axios from "axios";

function InventoryManagement() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", imgURL: "", pricePerUnit: "" });
  const [editProduct, setEditProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://bulk-order-platform.onrender.com/inventory");
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
    console.log(newProduct)
      await axios.post("https://bulk-order-platform.onrender.com/inventory", newProduct, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      fetchProducts();
      setNewProduct({ name: "", imgURL: "", pricePerUnit: "" });
    } catch (err) {
      console.error("Error adding product", err);
    }
  };

  const handleEditProduct = async () => {
    try {
      await axios.put(`https://bulk-order-platform.onrender.com/inventory/${editProduct._id}`, editProduct, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      fetchProducts();
      setEditProduct(null);
    } catch (err) {
      console.error("Error editing product", err);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
        console.log("Deleting product with ID:", id);
      await axios.delete(`https://bulk-order-platform.onrender.com/inventory/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product", err);
    }
  };

  return (
    <div>
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

      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - ${product.pricePerUnit}
            <button onClick={() => setEditProduct(product)}>Edit</button>
            <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InventoryManagement;
