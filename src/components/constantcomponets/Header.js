import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const status = useSelector((store) => store.user.status);
  const data = useSelector((store) => store.user.data);
  const cartProducts = useSelector((store) => store.cart.products);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Calculate total quantity from cart products
  const totalQuantity = cartProducts.reduce(
    (total, product) => total + product.quantity,
    0
  );

  return (
    <header>
      <nav className="bg-white px-4 lg:px-6 py-3 border-b-2 border-gray-200">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img
              src="https://www.nileshblog.tech/wp-content/uploads/2023/12/NileshBlog.Tech-Software-Development-Learning-Problem-Solving-Platform.svg"
              className="mr-3 h-8 sm:h-10"
              alt="NileshBlog.Tech Logo"
            />
          </Link>
          <div className="flex items-center lg:order-2 space-x-4">
            {status && data.role !== "USER" && (
              <Link
                to={data.role === "ADMIN" ? "/admin/dashboard" : "/dashboard"}
                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-2 lg:px-5 lg:py-2.5"
              >
                Dashboard
              </Link>
            )}
            {!status ? (
              <Link
                to="/login"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 lg:px-5 lg:py-2.5"
              >
                Log in
              </Link>
            ) : (
              <div>
                {status && (
                  <div className="relative group">
                    <Link to="/profile" className="focus:outline-none">
                      <img
                        src={data.avatar} // User avatar
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                      />
                    </Link>

                    {/* Dropdown menu */}
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <ul className="py-2 text-sm text-gray-700">
                        <li>
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/logout"
                            className="block px-4 py-2 text-red-700 hover:bg-gray-100"
                          >
                            Logout
                          </Link>
                        </li>
                        <li>
                          {status && (
                            <h2 className="block px-4 py-2 text-red-700 hover:bg-gray-100">
                              Role: <span className="capitalize">{data.role}</span>
                            </h2>
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}

            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-900 rounded-lg lg:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              aria-controls="mobile-menu-2"
              aria-expanded={isMenuOpen ? "true" : "false"}
              onClick={toggleMenu}
            >
              {!isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>

          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link
                  to="/"
                  className="block py-2 pr-4 pl-3 text-gray-900 rounded bg-blue-700 lg:bg-transparent lg:text-blue-700 lg:p-0"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>

              {status && (
                <li>
                  <Link
                    to="/order"
                    className="block py-2 pr-4 pl-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0"
                  >
                    Order
                  </Link>
                </li>
              )}
              <li>
  <Link
    to="/cart"
    className="relative flex items-center space-x-1 py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0"
  >
    {/* Shopping cart icon (Heroicons) */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13l-2 5h14"
      />
    </svg>

    <span>Cart</span>

    {totalQuantity > 0 && (
      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold rounded-full px-2.5 py-0.5 min-w-[22px] text-center shadow-lg">
        {totalQuantity}
      </span>
    )}
  </Link>
</li>

            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
