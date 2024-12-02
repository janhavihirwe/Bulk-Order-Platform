import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const OrdersPage = () => {
  const { state } = useLocation();
  const buyerName = state?.buyerName || ""; 
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    if (buyerName) {
      const fetchOrders = async () => {
        try {
          const response = await fetch(
            "https://bulk-order-platform-1.onrender.com/order"
          );
          if (!response.ok) throw new Error("Failed to fetch orders");
          const data = await response.json();
          setOrders(data);
          setHasLoaded(true);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      };
      fetchOrders();
    }
  }, [buyerName]);

  
  useEffect(() => {
    if (buyerName) {
      const filtered = orders.filter((order) => order.buyerName === buyerName);
      setFilteredOrders(filtered);
    }
  }, [buyerName, orders]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `https://bulk-order-platform-1.onrender.com/order/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!response.ok) throw new Error("Failed to update status");

      
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Error updating order status");
    }
  };

  return (
    <>
      <div style={{background:"#4caf50", color: 'white', padding: '3px', borderRadius: '2px',display:"flex",height:"60px",alignItems:"center"}}>
      <FaHome style={{marginLeft:"30px",fontSize: '30px', cursor: 'pointer'}} onClick={() => navigate("/")} />
      <h1 style={{margin:"auto"}}>Bulk Ordering Platform</h1>
      </div>

      {buyerName ? (
        <>
          {!hasLoaded ? (
            <p>Loading orders...</p>
          ) : filteredOrders.length === 0 ? (
            <p>No orders found for buyer: {buyerName}</p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "20px",
                padding: "20px",
              }}
            >
              {filteredOrders.map((order) => (
                <div
                  key={order._id}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "15px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div style={{ alignItems: "center", marginBottom: "10px" }}>
                    {order.product && (
                      <>
                        <div>
                          <img
                            src={order.product.imgURL}
                            alt={order.product.name}
                            style={{
                              width: "100%",
                              height: "150px",
                              objectFit: "cover",
                              borderRadius: "5px",
                            }}
                          />
                        </div>
                        <div>
                          <h3 style={{ margin: "0 0 5px 0" }}>
                            {order.product.name}
                          </h3>
                          <p style={{ margin: 0 }}>Order ID: {order._id}</p>
                        </div>
                      </>
                    )}
                  </div>
                  <div>
                    <p>
                      <strong>Buyer:</strong> {order.buyerName}
                    </p>
                    <p>
                      <strong>Contact:</strong> {order.contactInfo}
                    </p>
                    <p>
                      <strong>Address:</strong> {order.deliveryAddress}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {order.quantity}
                    </p>
                    <p>
                      <strong>Status:</strong> {order.status}
                    </p>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      style={{
                        marginTop: "10px",
                        padding: "5px",
                        borderRadius: "4px",
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <p>No Orders.</p>
      )}
    </>
  );
};

export default OrdersPage;
