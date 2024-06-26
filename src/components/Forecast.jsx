import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const Forecast = ({ city }) => {
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    if (city) {
      fetchForecastData(city);
    }
  }, [city]);

  const fetchForecastData = async (city) => {
    const apiKey = "751d66e130befad396405dc13796a57c";
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    try {
      const response = await axios.get(forecastUrl);
      const data = response.data;
      const dailyData = data.list.filter((reading) =>
        reading.dt_txt.includes("12:00:00")
      );
      setForecastData(dailyData);
    } catch (error) {
      console.error("Error fetching the forecast data", error);
    }
  };

  const prepareChartData = () => {
    const labels = forecastData.map((reading) => {
      const date = new Date(reading.dt * 1000);
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    });

    const data = {
      labels: labels,
      datasets: [
        {
          label: "Temperature (°C)",
          data: forecastData.map((reading) => reading.main.temp - 273.15),
          fill: false,
          borderColor: "rgba(75,192,192,1)",
          tension: 0.1,
          yAxisID: "y-axis-1",
        },
        {
          label: "Humidity (%)",
          data: forecastData.map((reading) => reading.main.humidity),
          fill: false,
          borderColor: "rgba(153,102,255,1)",
          tension: 0.1,
          yAxisID: "y-axis-2",
        },
        {
          label: "Wind Speed (m/s)",
          data: forecastData.map((reading) => reading.wind.speed),
          fill: false,
          borderColor: "rgba(255,159,64,1)",
          tension: 0.1,
          yAxisID: "y-axis-3",
        },
      ],
    };

    return data;
  };

  const options = {
    scales: {
      "y-axis-1": {
        type: "linear",
        position: "left",
        title: {
          display: true,
          text: "Temperature (°C)",
        },
      },
      "y-axis-2": {
        type: "linear",
        position: "right",
        title: {
          display: true,
          text: "Humidity (%)",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      "y-axis-3": {
        type: "linear",
        position: "right",
        title: {
          display: true,
          text: "Wind Speed (m/s)",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div>
      {forecastData.length > 0 ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginTop: "28px",
              border: "2px solid blue",
              height: "500px",
            }}
          >
            <div style={{ fontSize: "xx-large", marginBottom: "20px" }}>
              Weekly Forecast
            </div>

            <div style={{ width: "800px", height: "600px" }}>
              <Line data={prepareChartData()} options={options} />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Forecast;
