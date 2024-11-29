import { useParams } from "react-router-dom";
import fetchCoinDetails from "../utilis/fetchCoinDetails";
const CoinDetails = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};

export default CoinDetails;
