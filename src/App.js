import "./App.css";
import Banner from "./components/Banner";
import CoinTable from "./components/CoinTable";
import Navbar from "./components/Navbar";
import { CoinProvider } from "./utilis/CoinCotext";

function App() {
  return (
    <CoinProvider>
      <div data-theme="forest">
        <Navbar />
        <Banner />
        <CoinTable />
      </div>
    </CoinProvider>
  );
}

export default App;
