import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { useContext } from "react";
import { CoinContext } from "../utilis/CoinCotext";
import { Facebook } from "react-content-loader";
import CoinInfoContainer from "./CoinInfoContainer";
import useFetchCoinDetails from "../utilis/useFetchCoinDetails";

const CoinDetails = () => {
  const { currency } = useContext(CoinContext);
  const { id } = useParams();
  const { coin, isLoading, isError, error } = useFetchCoinDetails(id);

  if (isLoading) {
    return <Facebook />;
  }
  if (isError) {
    return <div>Error:{error.message}</div>;
  }

  return (
    <div className="flex flex-col md:flex-row">
      {/* Left Column */}
      <div className="md:w-1/3 w-full flex flex-col items-center mt-6 md:mt-0 border-r-2 border-gray-500 px-4">
        <img
          src={coin?.image?.large}
          alt={coin?.name}
          className="h-52 mb-5 object-contain"
        />
        <h1 className="text-3xl md:text-4xl font-bold mb-5">{coin?.name}</h1>
        <p className="text-base md:text-lg w-full px-6 py-4 text-justify">
          {parse(coin?.description?.en)}
        </p>
        <div className="w-full flex flex-col md:flex-row md:justify-around px-5">
          <div className="flex items-center mb-4 md:mb-0">
            <h2 className="text-xl font-bold">Rank</h2>
            <span className="ml-3 text-xl">{coin?.market_cap_rank}</span>
          </div>
          <div className="flex items-center mb-4 md:mb-0">
            <h2 className="text-xl text-yellow-400 font-bold">Current Price</h2>
            <span className="ml-3 text-xl">
              {coin?.market_data.current_price[currency]} in{" "}
              {currency.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="md:w-2/3 w-full p-6">
        <CoinInfoContainer coinId={id} />
      </div>
    </div>
  );
};

export default CoinDetails;
