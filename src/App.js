import "./App.css";
import CoinDetails from "./components/CoinDetails";
import Home from "./components/Home";
import { CoinProvider } from "./utilis/CoinCotext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/coins/:id",
    element: <CoinDetails />,
  },
]);

function App() {
  return (
    <CoinProvider>
      <div data-theme="forest">
        <RouterProvider router={appRouter} />
      </div>
    </CoinProvider>
  );
}

export default App;
