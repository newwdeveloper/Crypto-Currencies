import { useContext, useEffect, useState } from "react";
import fetchCoinData from "../utilis/fetchCoinData";
import { useQuery } from "react-query";
import { CoinContext } from "../utilis/CoinCotext";
import { useNavigate } from "react-router-dom";
import { Facebook } from "react-content-loader";
import { useDispatch } from "react-redux";
import { addCoins } from "../utilis/DataSlice";

const CoinTable = () => {
  const { currency } = useContext(CoinContext);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isLoading, isError, error } = useQuery(
    ["coins", page, currency], // Unique query key
    () => fetchCoinData(page, currency), // Query function
    {
      cacheTime: 1000 * 60 * 2, // Cache the data for 2 minutes
      staleTime: 1000 * 60 * 2, // Data fresh for 2 minutes
    }
  );

  useEffect(() => {
    if (data) {
      dispatch(addCoins(data));
    }
  }, [data, dispatch]);

  function handleCoinClick(id) {
    navigate(`/coins/${id}`);
  }

  if (isLoading) return <Facebook />;
  if (isError) return <div>Error :{error.message}</div>;

  return (
    <div className="my-5 flex flex-col items-center justify-center mx-auto w-full max-w-screen-lg px-4 gap-5">
      <div className="text-2xl font-semibold text-center">
        {currency.toUpperCase()}
      </div>
      <div className="w-full bg-yellow-400 text-black flex py-4 px-2 font-semibold items-center justify-between sm:justify-start sm:px-5">
        <div className="basis-[35%] text-center sm:text-left">Coin</div>
        <div className="basis-[25%] text-center sm:text-left">Price</div>
        <div className="basis-[20%] text-center sm:text-left">24 hr change</div>
        <div className="basis-[20%] text-center sm:text-left">Market cap</div>
      </div>
      <div className="flex flex-col w-full mx-auto gap-3">
        {isLoading && <Facebook />}
        {data &&
          data.map((coin) => {
            return (
              <div
                onClick={() => handleCoinClick(coin.id)}
                key={coin.id}
                className="w-full bg-transparent text-white flex py-4 px-3 sm:px-5 font-semibold items-center justify-between cursor-pointer hover:bg-gray-800 transition duration-200"
              >
                <div className="flex items-center justify-start gap-3 basis-[35%]">
                  <div className="w-[4rem] h-[4rem] sm:w-[5rem] sm:h-[5rem]">
                    <img
                      src={coin.image}
                      className="w-full h-full object-contain"
                      alt="coin pic"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-xl sm:text-3xl">{coin.name}</div>
                    <div className="text-lg sm:text-xl">{coin.symbol}</div>
                  </div>
                </div>
                <div className="basis-[25%] text-center sm:text-left">
                  {coin.current_price}
                </div>
                <div className="basis-[20%] text-center sm:text-left">
                  {typeof coin.price_change_percentage_24h === "number"
                    ? coin.price_change_percentage_24h.toFixed(3)
                    : "N/A"}
                  %
                </div>

                <div className="basis-[20%] text-center sm:text-left">
                  {coin.market_cap}
                </div>
              </div>
            );
          })}
      </div>
      <div className="flex gap-4 justify-center items-center mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="btn btn-primary btn-lg text-white text-lg sm:text-2xl sm:btn-wide"
        >
          Prev
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="btn btn-secondary btn-lg text-white text-lg sm:text-2xl sm:btn-wide"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CoinTable;
