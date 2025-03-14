import "./style.css";

function Footer() {
  return (
    <footer className="footer bg-gray-100 text-gray-700 py-6 mt-10 border-t">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        
        {/* Copyright Section */}
        <p className="text-lg font-semibold mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} ShoppyGlobe. All rights reserved.
        </p>

        {/* Navigation Links */}
        <ul className="flex flex-col md:flex-row gap-4 md:gap-6 mb-4 md:mb-0">
          <li><a href="#" className="hover:text-blue-500 transition">About Us</a></li>
          <li><a href="#" className="hover:text-blue-500 transition">Contact</a></li>
          <li><a href="#" className="hover:text-blue-500 transition">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-blue-500 transition">Terms of Service</a></li>
        </ul>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">🔵</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">🐦</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">📷</a>
        </div>
      
      </div>
    </footer>
  );
}

export default Footer;
