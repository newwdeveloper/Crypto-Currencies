import { useContext, useState } from "react";
import { fetchCoinHistoricalData } from "../utilis/fetchCoinHistoricalData";
import CoinInfo from "./CoinInfo";
import { CoinContext } from "../utilis/CoinCotext";
import { useQuery } from "react-query";
import { Facebook } from "react-content-loader";
import Alert from "../utilis/Alert";

const CoinInfoContainer = ({ coinId }) => {
  const { currency } = useContext(CoinContext);
  const [days, setDays] = useState(7);
  const [interval, setCoinInterval] = useState("daily");
  const {
    data: historicData,
    isLoading,
    isError,
  } = useQuery(
    ["coinHistoricalData", coinId, currency, days, interval],
    () => fetchCoinHistoricalData(coinId, currency, days, interval),
    {
      cacheTime: 1000 * 60 * 2,
      staleTime: 1000 * 60 * 2,
    }
  );

  if (isLoading) {
    return <Facebook />;
  }
  if (isError) {
    return <Alert message="Error fetching data" type="error" />;
  }
  return (
    <>
      <CoinInfo
        historicData={historicData}
        setDays={setDays}
        setInterval={setCoinInterval}
        days={days}
        currency={currency}
      />
    </>
  );
};

export default CoinInfoContainer;
