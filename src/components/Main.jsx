import React, { useState } from "react";
import axios from "axios";
import {
  FaTint,
  FaWind,
  FaThermometerHalf,
  FaThermometerFull,
  FaThermometerEmpty,
  FaCloud,
  FaSun,
} from "react-icons/fa";
import { WiDaySunny } from "react-icons/wi";
import { MdOutlineVisibility } from "react-icons/md";
import { IoSpeedometerOutline } from "react-icons/io5";
import Forecast from "./Forecast"; // Import the Forecast component

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [uv, setUV] = useState({ UV: "" });
  const [sunrise, setSunrise] = useState({ sunrise: "" });
  const [sunset, setSunset] = useState({ sunset: "" });
  const [weatherData, setWeatherData] = useState({
    city: "Enter Your City",
    date: "",
    temperature: "",
    humidity: "",
    wind: "",
    pressure: "",
    maxTemp: "",
    weatherCondition: "",
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    const data = await getWeatherAndUVIndex(city);
    if (data) {
      console.log("Weather Data:", data.weather);
      console.log("UV Index:", data.uvIndex);
      setUV({ UV: data.uvIndex });
      setSunrise({
        sunrise: convertUnixTo12HourTime(
          data.weather.sys.sunrise + data.weather.timezone
        ),
      });
      setSunset({
        sunset: convertUnixTo12HourTime(
          data.weather.sys.sunset + data.weather.timezone
        ),
      });
      setWeatherData({
        city: data.weather.name,
        date: convertUnixToLocalTime(data.weather.dt, data.weather.timezone),
        temperature: data.weather.main.temp,
        humidity: data.weather.main.humidity,
        wind: data.weather.wind.speed,
        pressure: data.weather.main.pressure,
        maxTemp: data.weather.main.temp_max,
        feels: data.weather.main.feels_like,
        minTemp: data.weather.main.temp_min,
        country: data.weather.sys.country,
        weatherCondition: data.weather.weather[0].main,
        visibility: data.weather.visibility,
        des: data.weather.weather[0].description,
      });
    }
  };

  async function getWeatherAndUVIndex(city) {
    const apiKey = "751d66e130befad396405dc13796a57c";
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
      const weatherResponse = await fetch(weatherUrl);
      if (!weatherResponse.ok) throw new Error("Weather data not available");
      const weatherData1 = await weatherResponse.json();
      const {
        coord: { lat, lon },
      } = weatherData1;

      const uvUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      const uvResponse = await fetch(uvUrl);
      if (!uvResponse.ok) throw new Error("UV index data not available");
      const uvData = await uvResponse.json();

      return {
        weather: weatherData1,
        uvIndex: uvData.value,
      };
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }

  function convertUnixTo12HourTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    return hours + ":" + minutesStr + " " + ampm;
  }

  function convertUnixToLocalTime(unixTimestamp, timezoneOffset) {
    const localTime = new Date((unixTimestamp + timezoneOffset) * 1000);
    return localTime.toLocaleString();
  }

  function getWeatherIcon(condition) {
    switch (condition) {
      case "Clear":
        return <FaSun size={40} />;
      case "Clouds":
        return <FaCloud size={40} />;
      case "Rain":
        return <FaTint size={40} />;
      default:
        return <WiDaySunny size={40} />;
    }
  }

  return (
    <div className="weather-app">
      <main>
        <section className="search-section">
          <h2>Check the Weather of Your City</h2>
          <p>
            Have a play around with the project and check what the weather
            forecast says about your city.
          </p>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{ width: "600px" }}
            />
            <button type="submit">Search</button>
          </form>
        </section>
        <section className="weather-details">
          <div className="city-info">
            <div
              style={{ display: "inline", float: "left", color: "aliceblue" }}
            >
              {getWeatherIcon(weatherData.weatherCondition)}
              <div style={{ maxWidth: "100px" }}>{weatherData.des}</div>
            </div>
            <h3>
              {weatherData.city}, {weatherData.country}
            </h3>
            <p>{weatherData.date}</p>
            <div className="temperature">
              {Math.round(weatherData.temperature - 273.15)}°C
            </div>
            <div
              style={{
                display: "flex",
                float: "left",
                width: "130px",
                marginBottom: "0px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Sunrise: {sunrise.sunrise} Sunset: {sunset.sunset}
            </div>
            <div>Feels Like: {Math.round(weatherData.feels - 273.15)}°C</div>
          </div>
          <div className="additional-info">
            <div className="info-item">
              <FaTint size={30} style={{ color: "antiquewhite" }} />
              <span>Humidity</span>
              <span className="data" style={{ color: "antiquewhite" }}>
                {weatherData.humidity}%
              </span>
            </div>
            <div className="info-item">
              <FaWind size={30} />
              <span>Wind</span>
              <span className="data">{weatherData.wind} m/s</span>
            </div>
            <div className="info-item">
              <IoSpeedometerOutline size={30} style={{ color: "beige" }} />
              <span>Pressure</span>
              <span className="data" style={{ color: "beige" }}>
                {weatherData.pressure} hPa
              </span>
            </div>
            <div className="info-item">
              <FaThermometerFull size={30} style={{ color: "red" }} />
              <span>Max Temp</span>
              <span className="data" style={{ color: "red" }}>
                {Math.round(weatherData.maxTemp - 273.15)}°C
              </span>
            </div>

            <div className="info-item">
              <FaThermometerEmpty size={30} style={{ color: "darkblue" }} />
              <span>Min Temp</span>
              <span className="data" style={{ color: "darkblue" }}>
                {Math.round(weatherData.minTemp - 273.15)}°C
              </span>
            </div>
            <div className="info-item">
              <WiDaySunny size={40} style={{ color: "yellow" }} />
              <span>UV Index Max</span>
              <span style={{ color: "yellow" }} className="data">
                {Math.round(uv.UV)}
              </span>
            </div>
            <div className="info-item">
              <MdOutlineVisibility size={30} style={{ color: "d40000" }} />
              <span>Visibility</span>
              <span style={{ color: "d40000" }} className="data">
                {Math.round(weatherData.visibility / 1000)} Km
              </span>
            </div>
          </div>
        </section>
        <Forecast city={weatherData.city} />{" "}
        {/* Render the Forecast component */}
      </main>
    </div>
  );
};

export default WeatherApp;
