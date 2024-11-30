import { useQuery } from "react-query";
import fetchCoinDetails from "./fetchCoinDetails";

const useFetchCoinDetails = (id) => {
  const {
    data: coin,
    isLoading,
    isError,
    error,
  } = useQuery(["coin", id], () => fetchCoinDetails(id), {
    cacheTime: 1000 * 60 * 2,
    staleTime: 1000 * 60 * 2,
  });
  return { coin, isLoading, isError, error };
};

export default useFetchCoinDetails;
