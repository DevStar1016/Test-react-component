import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AccountArea = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // Both useEffects combined into one for better readability
  useEffect(() => {
    const token = localStorage.getItem('productly');
    if (!token) {
      navigate('/login');
    } else {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);

      const fetchProducts = async () => {
        const response = await fetch('https://api.productly.app/products', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data.products);
      };

      fetchProducts().catch(error => {
        console.error('Error fetching products:', error);
        setError(error.message);
      });
    }
  }, [navigate]);

  // Used callback to calculate progress bar width to optimize render performance
  const progressBarWidth = React.useCallback(() => {
    const maxProducts = 50; // Hardcoded value
    return (products.length / maxProducts) * 100;
  }, [products.length]);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <div>
        {products.map(product => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            {/* Implemented missing product description */}
            <p>{product.description}</p>
          </div>
        ))}
      </div>
      {/* Added '%' to make the width calculation work as intended */}
      <div style={{ width: `${progressBarWidth()}%` }}>Progress Bar</div>
    </div>
  );
};

export default AccountArea;