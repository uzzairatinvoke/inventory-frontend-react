import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

function Dashboard({ onLogout }) {
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);
  // logout's logic
  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        await axios.post(
          "http://localhost:8000/api/v1/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Logout error:", error);
      }
    }

    localStorage.removeItem("token");

    if (onLogout) {
      onLogout();
    }

    navigate("/login");
  };

  const handleProductCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="max-w-5xl mx-auto my-16 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          // event to trigger logout
          onClick={handleLogout}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
        >
          Logout
        </button>
      </div>

      <ProductForm onProductCreated={handleProductCreated} />
      <ProductList key={refreshKey} />
    </div>
  );
}

export default Dashboard;
