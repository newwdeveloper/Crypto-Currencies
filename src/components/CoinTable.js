import { useState } from "react";
import fetchCoinData from "../utilis/fetchCoinData";
import { useQuery } from "react-query";

const CoinTable = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery(
    ["coins", page], // Unique query key
    () => fetchCoinData(page, "usd"), // Query function
    {
      // retry: 2, // Retry twice if the request fails,commented just to not get over the limit of free api
      // retryDelay: 1000, // Wait 1 second between retries
      cacheTime: 1000 * 60 * 2, // Cache the data for 2 minutes
      staleTime: 1000 * 60 * 2, // this tells how long we consider data fresh, till that we dont call any new api
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error :{error.message}</div>;

  return (
    <div className="my-5 flex flex-col items-center justify-center mx-auto w-[80vw] gap-5">
      <div className="w-full bg-yellow-400 text-black flex py-4 px-2 font-semibold items-center justify-center">
        <div className="basis-[35%]">Coin</div>
        <div className="basis-[25%]">Price</div>
        <div className="basis-[20%]">24 hr change</div>
        <div className="basis-[20%]">Market cap</div>
      </div>
      <div className="flex flex-col w-[80vw] mx-auto">
        {data &&
          data.map((coin) => {
            return (
              <div
                key={coin.id}
                className="w-full bg-transparent text-white flex  py-4 px-2 font-semibold 
              items-center justify-between"
              >
                <div className="flex items-center justify-start gap-3 basis-[35%]">
                  <div className="w-[5rem] h-[5rem]">
                    <img
                      src={coin.image}
                      className="w-full h-full"
                      alt="coin pic"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-3xl">{coin.name}</div>
                    <div className="text-xl">{coin.symbol}</div>
                  </div>
                </div>
                <div className="basis-[25%] text-white">
                  {coin.current_price}
                </div>
                <div className="basis-[20%] text-white">
                  {coin.price_change_percentage_24h}%
                </div>
                <div className="basis-[20%] text-white">{coin.market_cap}</div>
              </div>
            );
          })}
      </div>
      <div className="flex gap-4 justify-center items-center">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="btn btn-primary btn-wide text-white text-2xl"
        >
          Prev
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="btn btn-secondary btn-wide text-white text-2xl"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CoinTable;
