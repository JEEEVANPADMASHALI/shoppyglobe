import { Link } from "react-router-dom";
import ProductItem from "./ProductItem";
import useFetch from "../utils/useFetch"; // Import custom hook

function ProductList() {
  const { data, loading, error } = useFetch("https://dummyjson.com/products"); // Fetch API data

  if (loading) return <p className="text-center text-blue-500 py-4">Loading products...</p>;
  if (error) return <p className="text-center text-red-500 py-4">{error}</p>;

  return (
    <div className="product-list px-4">
      {data?.products.length > 0 ? (
        data.products.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id}>
            <ProductItem productDetails={product} />
          </Link>
        ))
      ) : (
        <p className="text-center text-gray-500 py-4">No products found.</p>
      )}
    </div>
  );
}

export default ProductList;
