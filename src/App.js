import "./App.css";
import Banner from "./components/Banner";
import CoinTable from "./components/CoinTable";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div data-theme="forest">
      <Navbar />
      <Banner />
      <CoinTable />
    </div>
  );
}

export default App;
