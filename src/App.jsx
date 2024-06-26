import "./App.css";
import Navbar from "./components/Navbar.jsx";
import WeatherApp from "./components/Main.jsx";
import Forecast from "./components/Forecast.jsx";
import About from "./components/About.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <>
      <Navbar />
      <WeatherApp />
      <Forecast />
      <About />
      <Footer />
    </>
  );
}

export default App;
