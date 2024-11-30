import { useContext, useState } from "react";
import { CoinContext } from "../utilis/CoinCotext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const coins = useSelector((store) => store.data.coins); // Fetch coins from Redux store
  const { setCurrency } = useContext(CoinContext); // Context to set currency
  const navigate = useNavigate();

  const [query, setQuery] = useState(""); // For search input
  const [filteredCoins, setFilteredCoins] = useState([]); // Filtered coins for dropdown

  const handleHomeBtn = () => {
    navigate("/");
  };

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency.toLowerCase());
  };

  const handleInputBox = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    // Filter coins based on the search query
    if (searchQuery) {
      const filtered = coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCoins(filtered);
    } else {
      setFilteredCoins([]); // Clear results if query is empty
    }
  };

  const handleCoinClick = (coin) => {
    setQuery(coin.name); // Set selected coin name in the input box
    setFilteredCoins([]); // Clear dropdown after selection
    navigate(`/coins/${coin.id}`); // Navigate to coin details (optional)
  };

  return (
    <div className="navbar bg-base-100">
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <button onClick={() => handleCurrencyChange("INR")}>INR</button>
            </li>
            <li>
              <button onClick={() => handleCurrencyChange("USD")}>USD</button>
            </li>
          </ul>
        </div>
      </div>

      {/* Navbar Center */}
      <div onClick={handleHomeBtn} className="navbar-center">
        <Link className="btn btn-ghost text-xl">Crypto Tracker</Link>
      </div>

      {/* Navbar End */}
      <div className="navbar-end relative">
        <div className="flex flex-col items-center gap-2 relative w-72">
          {/* Search Input */}
          <div className="w-full">
            <input
              className="border-white p-2 border-2 outline-none bg-white text-black text-lg rounded-2xl w-full"
              type="search"
              alt="search"
              placeholder="Search coins..."
              value={query}
              onChange={handleInputBox}
            />
          </div>

          {/* Dropdown Results */}
          {filteredCoins.length > 0 && (
            <ul
              className="absolute left-0 top-full bg-white border border-gray-300 rounded-lg w-full max-h-60 overflow-y-auto shadow-md z-50"
              style={{ marginTop: "0.25rem" }}
            >
              {filteredCoins.map((coin) => (
                <li
                  key={coin.id}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleCoinClick(coin)}
                >
                  {coin.name} ({coin.symbol.toUpperCase()})
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
