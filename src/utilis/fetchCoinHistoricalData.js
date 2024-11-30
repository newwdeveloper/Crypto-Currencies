import axiosInstance from "./AxiosInstances";

export async function fetchCoinHistoricalData(
  id,
  currency = "usd", // Default value 'usd' if no currency is passed
  days = 7, // Default value '7' if no days are specified
  interval = "daily" // Default value 'daily' if no interval is passed
) {
  try {
    // Construct the URL dynamically based on the parameters
    const url = `/coins/${id}/market_chart?vs_currency=${currency}&days=${days}&interval=${interval}`;
    // Make the API request using axiosInstance
    const response = await axiosInstance.get(url);
    // Return the response data
    return response.data;
  } catch (error) {
    // Log any errors
    console.error("Error fetching historical data:", error);

    // Return null if an error occurs
    return null;
  }
}
