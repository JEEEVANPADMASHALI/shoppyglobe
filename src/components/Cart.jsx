import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../utils/cartSlice";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  // Calculate Total Price
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4 text-center">Your Cart 🛒</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {/* Cart Items */}
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-6 border p-4 rounded-lg shadow-md bg-white hover:shadow-lg transition duration-200">
              {/* Product Image */}
              <img src={item.thumbnail} alt={item.title} className="h-24 w-24 object-cover rounded-lg" />

              {/* Product Details */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)} each</p>

                {/* Quantity Selector */}
                <div className="flex items-center mt-2">
                  <button
                    className="px-3 py-2 bg-gray-300 text-gray-700 rounded-l hover:bg-gray-400 transition"
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    disabled={item.quantity === 1} // Prevent decreasing below 1
                  >
                    -
                  </button>
                  <span className="px-4 py-2 bg-white border text-lg font-semibold">{item.quantity}</span>
                  <button
                    className="px-3 py-2 bg-gray-300 text-gray-700 rounded-r hover:bg-gray-400 transition"
                    onClick={() => dispatch(increaseQuantity(item.id))}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Remove Button */}
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                <MdDelete />
              </button>
            </div>
          ))}

          {/* Total Price & Checkout Section */}
          <div className="mt-6 p-4 border-t flex justify-between items-center">
            <h3 className="text-2xl font-semibold">Total: ${totalAmount.toFixed(2)}</h3>
            <button
              className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-200"
              onClick={() => navigate("/checkout")} // Navigate to Checkout Page
            >
              🛒 Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
