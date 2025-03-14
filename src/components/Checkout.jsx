import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Checkout() {
  const cartItems = useSelector((state) => state.cart);
  const navigate = useNavigate(); // Initialize navigate
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  // Calculate total amount
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePayment = (e) => {
    e.preventDefault();
    console.log("Processing payment with:", { paymentMethod, cardDetails });

    alert("Payment Successful! wait for a second");

    setTimeout(() => {
      navigate("/"); // Redirect to Home page
    }, 2000); // Optional delay for a better UX
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6">Checkout</h2>

        {/* Order Summary */}
        <div className="border p-4 rounded mb-4">
          <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
          {cartItems.map((item) => (
            <p key={item.id}>
              {item.title} x {item.quantity} - ${item.price * item.quantity}
            </p>
          ))}
          <hr className="my-2" />
          <p className="font-bold">Total: ${totalAmount.toFixed(2)}</p>
        </div>

        {/* Payment Method */}
        <form onSubmit={handlePayment} className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-700">Payment Method</label>
            <select
              className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="card">Credit/Debit Card</option>
              <option value="paypal">PayPal</option>
              <option value="upi">UPI</option>
            </select>
          </div>

          {/* Card Details - Show only if Card is selected */}
          {paymentMethod === "card" && (
            <div className="border p-4 rounded">
              <h3 className="text-lg font-semibold">Card Details</h3>
              <input
                type="text"
                placeholder="Cardholder Name"
                className="w-full p-3 border rounded mt-2"
                value={cardDetails.name}
                onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Card Number"
                className="w-full p-3 border rounded mt-2"
                value={cardDetails.cardNumber}
                onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                required
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full p-3 border rounded mt-2"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="w-full p-3 border rounded mt-2"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                  required
                />
              </div>
            </div>
          )}

          {/* Pay Now Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
