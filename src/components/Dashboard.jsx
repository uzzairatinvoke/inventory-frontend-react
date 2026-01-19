import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

function Dashboard({ onLogout }) {
  const navigate = useNavigate();
  const { user, logout, hasPermission } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);
  
  // logout's logic
  const handleLogout = async () => {
    await logout();
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
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          {user && (
            <p className="text-sm text-gray-600 mt-1">
              Welcome, {user.name} ({user.roles?.join(", ") || "No role"})
            </p>
          )}
        </div>
        <button
          // event to trigger logout
          onClick={handleLogout}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
        >
          Logout
        </button>
      </div>

      {hasPermission("products-create") && (
        <ProductForm onProductCreated={handleProductCreated} />
      )}
      {hasPermission("products-view") && (
        <ProductList key={refreshKey} />
      )}
      {!hasPermission("products-view") && (
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-yellow-800">
            You don't have permission to view products.
          </p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
