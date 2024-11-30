import "./App.css";
import MainLayout from "./components/MainLayout";
import { CoinProvider } from "./utilis/CoinCotext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Facebook } from "react-content-loader";
import { Provider } from "react-redux";
import dataStore from "./utilis/appStore";

const Home = lazy(() => import("../src/components/Home"));
const CoinDetails = lazy(() => import("./components/CoinDetails"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Facebook />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/coins/:id",
        element: (
          <Suspense fallback={<Facebook />}>
            <CoinDetails />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={dataStore}>
      <CoinProvider>
        <div data-theme="forest">
          <RouterProvider router={appRouter} />
        </div>
      </CoinProvider>
    </Provider>
  );
}

export default App;
