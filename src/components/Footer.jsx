
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 text-gray-700">

      {/* Footer Main Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <Link
              to="/"
              className="text-4xl font-extrabold text-pink-600 tracking-tight"
            >
              meesho<span className="text-purple-600">.</span>
            </Link>

            <p className="text-gray-500 text-sm leading-7 mt-4 max-w-xs">
              India's favourite online shopping destination.
              Find something you'll love at a price you'll love.
            </p>

            <p className="text-sm text-gray-500 mt-5">
              Shop smart. Shop happy!
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-5">
              Shop
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <Link
                to="/category/Women%20Ethnic"
                className="hover:text-pink-600 transition-colors"
              >
                Women Ethnic
              </Link>

              <Link
                to="/category/Men"
                className="hover:text-pink-600 transition-colors"
              >
                Men
              </Link>

              <Link
                to="/category/Kids"
                className="hover:text-pink-600 transition-colors"
              >
                Kids
              </Link>

              <Link
                to="/category/Home%20%26%20Kitchen"
                className="hover:text-pink-600 transition-colors"
              >
                Home & Kitchen
              </Link>
            </div>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-5">
              Help
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <a
                href="mailto:support@example.com"
                className="hover:text-pink-600 transition-colors"
              >
                Contact Us
              </a>

              <Link
                to="/"
                className="hover:text-pink-600 transition-colors"
              >
                Shipping & Returns
              </Link>

              <Link
                to="/"
                className="hover:text-pink-600 transition-colors"
              >
                FAQs
              </Link>

              <Link
                to="/"
                className="hover:text-pink-600 transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-5">
              Connect With Us
            </h3>

            <p className="text-sm text-gray-500 leading-6 mb-5">
              Follow us for the latest trends, fashion updates and offers.
            </p>

            <div className="flex items-center gap-3">

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold hover:bg-pink-600 hover:text-white transition-all"
              >
                f
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-lg hover:bg-pink-600 hover:text-white transition-all"
              >
                ◎
              </a>

              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-lg hover:bg-pink-600 hover:text-white transition-all"
              >
                ▶
              </a>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3">

          <p className="text-sm text-gray-500 text-center">
            © 2026 Meesho UI Clone. All rights reserved.
          </p>

          <p className="text-sm text-gray-500">
            Created for learning purposes ❤️
          </p>

        </div>
      </div>

    </footer>
  );
}

export default Footer;
