const API_URL = "https://api.coingecko.com/api/v3/coins/markets"; // Example API

// Function to fetch all coins (without pagination limits)
export const fetchAllCoins = async () => {
  try {
    const response = await fetch(
      `${API_URL}?vs_currency=usd&order=market_cap_desc&per_page=250&page=1`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching coins:", error);
    return [];
  }
};
