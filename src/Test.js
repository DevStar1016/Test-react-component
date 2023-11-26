import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AccountArea = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("productly");
      if (!token) {
        navigate("/login");
      } else {
        const decodedUser = jwtDecode(token);
        /** Unnecessary setState: user */
        setUser(decodedUser);

        const response = await fetch("https://api.productly.app/products", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // setProducts(data.products);
      }
    };

    fetchProducts().catch((error) => {
      console.error("Error fetching products:", error);
      setError(error.message);
    });
  }, [navigate]);

  // Incorrect implementation of progress bar width calculation
  const progressBarWidth = () => {
    const maxProducts = 50; // Hardcoded value
    return (products.length / maxProducts) * 100;
  };

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            {/* Missing product description */}
          </div>
        ))}
      </div>
      <div style={{ width: progressBarWidth() }}>Progress Bar</div>
    </div>
  );
};

export default AccountArea;
