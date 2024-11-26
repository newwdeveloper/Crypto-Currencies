import { options } from "../utilis/CONSTANTS";
import { useEffect } from "react";

const CoinTable = () => {
  const fetchData = async () => {
    const data = await fetch(
      "https://api.coingecko.com/api/v3/coins/list",
      options
    );
    const json = await data.json();
    console.log(json);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h3>Coins</h3>
    </div>
  );
};

export default CoinTable;
