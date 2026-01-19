import axios from "axios";
import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function ProductForm({ onProductCreated }) {
  const { hasPermission } = useAuth();
  
  // Only render if user has create permission
  if (!hasPermission("products-create")) {
    return null;
  }
  // set the states first
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // 1. set the useRef value
  const productPhotoFile = useRef(null);

  // function untuk handle upload file input
  const handlePhotoUpload = (e) => {
    // wakilkan photo sebagai variable
    const photo = e.target.files[0];
    // file size validation, kurang dari 10MB
    if (photo && photo.size <= 10 * 1024 * 1024) {
      setPhoto(photo);
    }
  };

  // 3. create the logic, form submission
  const handleSubmit = async (e) => {
    // disable html form submission behavior
    e.preventDefault();
    // set empty error message
    setError("");
    // set loading state true
    setLoading(true);
    // tarik dulu auth/bearer token dari localStorage
    const token = localStorage.getItem("token");

    // const productData = {
    //   // name (key): nama column
    //   // name (value): nilai daripada input field
    //   name: name,
    //   description: description || null,
    //   price: parseFloat(price),
    //   stock: stock ? parseInt(stock) : 0,
    //   photo: photo ? photo : null,
    // };

    //kena guna FormData() sebab ada file upload
    // instantiate productData sebagai FormData
    const productData = new FormData();
    productData.append("name", name);
    productData.append("description", description || null);
    productData.append("price", parseFloat(price));
    productData.append("stock", stock ? parseInt(stock) : 0);

    if (photo) {
      productData.append("photo", photo);
    }

    try {
      await axios.post("http://localhost:8000/api/v1/products", productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // reset the input fields
      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setPhoto(null);
      // 3. remove current value 
      if (productPhotoFile.current) {
        productPhotoFile.current.value = "";
      }

      if (onProductCreated) {
        onProductCreated();
      }
    } catch (err) {
      if (err.response?.data?.errors) {
        const errors = err.response.data.errors;
        const errorMessages = Object.values(errors).flat().join(", ");
        setError(errorMessages);
      } else {
        setError(err.response?.data?.message || "Failed to create product");
      }
    } finally {
      setLoading(false);
    }
  };
  // 2. render the ui
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Create Product</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-lg p-6"
        encType="multipart/form-data"
      >
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded">{error}</div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stock
          </label>
          <input
            type="number"
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Photo
          </label>
          <input
            ref={productPhotoFile}
            disabled={loading}
            onChange={handlePhotoUpload}
            type="file"
            
          />
          <p
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            SVG, PNG, JPG or GIF (MAX. 800x400px).
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
