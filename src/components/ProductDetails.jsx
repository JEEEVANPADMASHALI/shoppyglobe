import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../utils/useFetch";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../utils/cartSlice"; // Import Redux action

function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: product, loading, error } = useFetch(`https://dummyjson.com/products/${productId}`);
  const [quantity, setQuantity] = useState(1);

  if (loading) return <p className="text-center text-blue-500 py-4">Loading product details...</p>;
  if (error)
    return (
      <div className="text-center text-red-500 py-4">
        ❌ Error: {error}
        <br />
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => window.location.reload()}
        >
          Retry 🔄
        </button>
      </div>
    );

  if (!product) return <p className="text-center text-gray-500 py-4">Product not found!</p>;

  // Add to cart handler
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity, // Pass selected quantity
      })
    );
  };

  return (
    <div className="container mx-auto p-6">
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
        onClick={() => navigate(-1)}
      >
        ← Back to Home
      </button>

      <div className="flex flex-col md:flex-row gap-6 border p-6 rounded shadow-lg">
        <img src={product?.thumbnail} alt={product?.title} className="w-64 h-64 object-cover rounded-lg" />

        <div>
          <h2 className="text-3xl font-bold">{product?.title}</h2>
          <p className="text-lg text-gray-700">{product?.category}</p>
          <p className="text-gray-600">{product?.description}</p>
          <p className="text-xl font-semibold mt-2">Price: ${product?.price}</p>
          <p className="text-lg text-green-600 font-semibold">
            Discount: {product?.discountPercentage}%
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center mt-4">
            <button
              className="px-3 py-2 bg-gray-300 text-gray-700 rounded-l hover:bg-gray-400"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            >
              -
            </button>
            <span className="px-4 py-2 bg-white border text-lg font-semibold">{quantity}</span>
            <button
              className="px-3 py-2 bg-gray-300 text-gray-700 rounded-r hover:bg-gray-400"
              onClick={() => setQuantity((prev) => Math.min(10, prev + 1))}
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
            onClick={handleAddToCart}
          >
            Add {quantity} to Cart 🛒
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
