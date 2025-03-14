import { useState } from "react";
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { useSelector } from "react-redux"; // Import useSelector
import "./style.css";
import { FaUser } from "react-icons/fa";

function Header({ onSearch }) {
  const [searchText, setSearchText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart); // Get cart from Redux
  const uniqueItemsCount = cartItems.length; // Count unique items

  function handleSearch() {
    onSearch(searchText);
  }

  return (
    <nav className="header flex justify-between items-center px-6 md:px-10 border-b-2 py-1 bg-white shadow-md relative">
      {/* Logo and Title */}
      <div className="flex items-center">
        <img
          src="https://media.istockphoto.com/id/1204513100/vector/shopping-cart-logo.jpg?s=612x612&w=0&k=20&c=8ucmOvXsQPtfFcExcpQMz2i6HsEXvBh0N9ZUz1_0eDk="
          alt="Logo"
          className="h-12 w-12 md:h-16 md:w-16"
        />
        <Link to="/" >
          <h1 className="text-xl md:text-2xl font-extrabold pl-2">shoppyglobe</h1>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex relative w-64">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className="absolute right-2 text-gray-600 pt-2 pr-1" onClick={handleSearch}>
          🔍
        </button>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-6">
        <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
        <li><Link to="/signin" className="hover:text-blue-500"><FaUser /></Link></li>
        <li className="relative">
          <Link to="/cart" className="hover:text-blue-500 flex items-center gap-1">
            <CiShoppingCart size={24} />
            {uniqueItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {uniqueItemsCount}
              </span>
            )}
          </Link>
        </li>
      </ul>

      {/* Hamburger Menu Button */}
      <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-0 w-full bg-white shadow-md py-4 md:hidden">
          <ul className="flex flex-col items-center gap-4">
            <Link to="/" className="hover:text-blue-500" onClick={() => setMenuOpen(false)}><li>Home</li></Link>
            <Link to="/signin" className="hover:text-blue-500" onClick={() => setMenuOpen(false)}><li><FaUser /></li></Link>
            <Link to="/cart" className="hover:text-blue-500 flex items-center gap-1" onClick={() => setMenuOpen(false)}>
              <li>
                <CiShoppingCart size={24} />
                {uniqueItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {uniqueItemsCount}
                  </span>
                )}
              </li>
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Header;
