import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

function ProductList() {
  const { hasPermission } = useAuth();
  // 1. set the state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // 3. handle fetching products logic
  const fetchProducts = async () => {
    // tarik token dari localStorage
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(response.data.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading products...</div>;
  }
  // 2. render the ui
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Products</h2>
      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Photo
                </th>
                {(hasPermission("products-update") || hasPermission("products-delete")) && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {product.description || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.photo ? (
                      <img 
                        src={product.photo} 
                        alt={product.name} 
                        className="h-16 w-16 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400">No photo</span>
                    )}
                  </td>
                  {(hasPermission("products-update") || hasPermission("products-delete")) && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {hasPermission("products-update") && (
                          <button
                            className="text-indigo-600 hover:text-indigo-900"
                            onClick={() => {
                              // TODO: Implement edit functionality
                              alert("Edit functionality coming soon");
                            }}
                          >
                            Edit
                          </button>
                        )}
                        {hasPermission("products-delete") && (
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={async () => {
                              if (window.confirm("Are you sure you want to delete this product?")) {
                                const token = localStorage.getItem("token");
                                try {
                                  await axios.delete(
                                    `http://localhost:8000/api/v1/products/${product.id}`,
                                    {
                                      headers: {
                                        Authorization: `Bearer ${token}`,
                                      },
                                    }
                                  );
                                  // Refresh the product list
                                  fetchProducts();
                                } catch (error) {
                                  console.error("Error deleting product:", error);
                                  alert("Failed to delete product");
                                }
                              }
                            }}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ProductList;
