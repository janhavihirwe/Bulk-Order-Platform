import React, { useEffect, useState } from "react";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch("https://bulk-order-platform.onrender.com/order"); // Adjust API URL if needed
            const data = await response.json();
            setOrders(data);
        };

        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        const response = await fetch(`https://bulk-order-platform.onrender.com/order/${orderId}/status`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: newStatus }),
        });

        if (response.ok) {
            // Update the UI with the new status
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId ? { ...order, status: newStatus } : order
                )
            );
        } else {
            alert("Error updating order status");
        }
    };

    return (
        <>
        <div style={{background:"#4caf50", color: 'white', padding: '3px', borderRadius: '2px'}}>
        <h1 >Bulk Ordering Platform</h1>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px", padding: "20px" }}>
            {orders.map((order) => (
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
                                        width: '100%',
                                        height: '150px',
                                        objectFit: 'cover',
                                        borderRadius: '5px',
                                    }}
                                />
                            </div>
                                <div>
                                    <h3 style={{ margin: "0 0 5px 0" }}>{order.product.name}</h3>
                                    <p style={{ margin: 0 }}>Order ID: {order._id}</p>
                                </div>
                            </>
                        )}
                    </div>
                    <div>
                        <p><strong>Buyer:</strong> {order.buyerName}</p>
                        <p><strong>Contact:</strong> {order.contactInfo}</p>
                        <p><strong>Address:</strong> {order.deliveryAddress}</p>
                        <p><strong>Quantity:</strong> {order.quantity}</p>
                        <p><strong>Status:</strong> {order.status}</p>
                        <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            style={{ marginTop: "10px", padding: "5px", borderRadius: "4px" }}
                        >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                </div>
            ))}
        </div>
        </>
    );
};

export default OrdersPage;
