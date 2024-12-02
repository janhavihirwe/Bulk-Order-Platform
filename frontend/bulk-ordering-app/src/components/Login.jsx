import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { toast } from "react-toastify";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log(username, password);

      
      const response = await fetch("https://bulk-order-platform-1.onrender.com/login/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }
      toast.success("Log In successfully!");
      const { token, role } = await response.json();

      
      localStorage.setItem("token", token);

      
      if (role === "admin") {
        navigate("/inventory");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid username or password");
    }
  };

  return (
    <>
    <div style={{background:"#4caf50", color: 'white',borderRadius:"2px",display:"flex",alignItems:"center",height:"60px"}}>
        <FaHome style={{marginLeft:"30px",fontSize: '30px', cursor: 'pointer'}} onClick={() => navigate("/")} />
        <h1 style={{margin:"auto"}}>Bulk Ordering Platform</h1>
    </div>
    <div style={styles.container}>
      <h1 style={styles.header}>Login</h1>
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
      </div>
      <button onClick={handleLogin} style={styles.button}>Login</button>
      <p style={styles.footerText}>
          Not registered yet?{" "}
          <span
            style={styles.signUpLink}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
    </div>
    </>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "60vh",
    padding: "20px",
  },
  header: {
    fontSize: "2rem",
    color: "#333",
    marginBottom: "20px",
  },
  error: {
    color: "red",
    marginBottom: "20px",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    outline: "none",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
    width: "25%",
  },
  footerText: {
    marginTop: "15px",
    fontSize: "1.2rem",
    color: "#555",
  },
  signUpLink: {
    color: "#007bff",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default Login;
