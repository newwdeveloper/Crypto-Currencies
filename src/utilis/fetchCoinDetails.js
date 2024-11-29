import axiosInstance from "./AxiosInstances";

export async function fetchCoinDetails() {
  try {
    const response = await axiosInstance.get(`/coins/id`);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default fetchCoinDetails;
