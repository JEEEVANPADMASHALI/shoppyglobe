import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../utils/cartSlice"; // Correct import
import "./style.css";

function ProductItem({ productDetails }) {
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useDispatch();

  function handleAddToCart(event) {
    event.stopPropagation(); // Prevents navigation when clicking the button
    event.preventDefault(); // Stops the default `<Link>` behavior

    if (!isAdded) {
      dispatch(addToCart(productDetails)); // Add item to Redux cart store
      setIsAdded(true);
      console.log(`Added to cart: ${productDetails.title}`);
    }
  }

  return (
    <div className="product-card">
      <img
        src={productDetails.thumbnail}
        alt={productDetails.title}
        height="250px"
        width="250px"
        className="product-image"
      />
      <div>
        <h2 className="product-title">{productDetails.title}</h2>
        <p className="product-category">{productDetails.category}</p>
        <p className="product-price">${productDetails.price}</p>
        <p className="product-discount">{productDetails.discountPercentage}% Off</p>

        <button
          className={`add-to-cart-btn ${isAdded ? "added" : ""}`} 
          onClick={handleAddToCart}
          disabled={isAdded}
        >
          {isAdded ? "Added to Cart ✅" : "Add to Cart 🛒"}
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
