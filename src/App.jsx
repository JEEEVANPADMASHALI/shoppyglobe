import { useState, useEffect } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  const [allProducts, setAllProducts] = useState([]); // Store full product list
  const [filteredProducts, setFilteredProducts] = useState([]); // Store filtered results

  // Fetch products from API
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data.products); // Store all products
        setFilteredProducts(data.products); // Initially, filteredProducts = allProducts
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  function handleSearch(searchText) {
    if (!searchText) {
      setFilteredProducts(allProducts); // Reset to all products if search is empty
    } else {
      const filtered = allProducts.filter((product) =>
        product.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }

  return (
    <div>
      <Header onSearch={handleSearch} />
      <Outlet context={{ filteredProducts }} /> {/* Pass filtered products */}
      <Footer />
    </div>
  );
}

export default App;
