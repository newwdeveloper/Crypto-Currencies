import Alert from "../utilis/Alert";
import { Line } from "react-chartjs-2";
import { CategoryScale, LinearScale } from "chart.js";
import Chart from "chart.js/auto";

const CoinInfo = ({ historicData, setDays, days, currency }) => {
  const chartDays = [
    { label: "7 days", value: 7 },
    { label: "30 days", value: 30 },
    { label: "45 days", value: 45 },
    { label: "90 days", value: 90 },
    { label: "180 days", value: 180 },
    { label: "360 days", value: 360 },
  ];

  Chart.register(CategoryScale, LinearScale);

  if (
    !historicData ||
    !historicData.prices ||
    historicData.prices.length === 0
  ) {
    return <Alert message="No data available" type="info" />;
  }

  // Format the labels to show "DD MMM YYYY"
  const labels = historicData.prices.map((pricePoint) => {
    const date = new Date(pricePoint[0]);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }).format(date);
  });

  const prices = historicData.prices.map((pricePoint) => pricePoint[1]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center mt-6 p-6 w-full md:w-3/4 bg-white rounded-lg shadow-lg">
        <div className="relative w-full h-72 md:h-96 flex items-center justify-center">
          <Line
            data={{
              labels, // Use formatted labels
              datasets: [
                {
                  label: `Price (Past ${days} ${
                    days === 1 ? "Day" : "Days"
                  }) in ${currency.toUpperCase()}`,
                  data: prices,
                  borderColor: "rgb(75, 192, 192)",
                  borderWidth: 2,
                  fill: false,
                  tension: 0.1, // Smoothness of the line
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              interaction: {
                mode: "index",
                intersect: false, // Allows tooltip to work anywhere along the line
              },
              plugins: {
                tooltip: {
                  mode: "nearest",
                  intersect: false,
                  callbacks: {
                    title: (tooltipItems) => {
                      const index = tooltipItems[0].dataIndex;
                      return labels[index]; // Show date as the title
                    },
                    label: (tooltipItem) => {
                      const value = tooltipItem.raw.toLocaleString("en-US", {
                        style: "currency",
                        currency: currency.toUpperCase(),
                      });
                      return `Price: ${value}`;
                    },
                  },
                },
              },
              elements: {
                point: {
                  radius: 0, // Remove points from the line
                },
              },
              scales: {
                x: {
                  type: "category",
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                  },
                },
                y: {
                  type: "linear",
                  ticks: {
                    callback: (value) =>
                      value.toLocaleString("en-US", {
                        style: "currency",
                        currency: currency.toUpperCase(),
                      }),
                  },
                },
              },
            }}
            className="w-full h-full"
          />
        </div>
        <div className="flex justify-center mt-5 w-full">
          <select
            className="select select-primary w-full max-w-xs bg-blue-500 text-white p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          >
            {chartDays.map((day, index) => (
              <option key={index} value={day.value}>
                {day.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CoinInfo;
