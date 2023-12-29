import React, { useEffect, useState } from "react";
import Selector from "./Selector";
import { City, Country, State } from "country-state-city";
import axios from "axios";

const apiKey = "f7e946057b9883b6a1ec5da10b90312b";

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  let countryData = Country.getAllCountries();
  const [stateData, setStateData] = useState();
  const [cityData, setCityData] = useState();
  const [country, setCountry] = useState(countryData[0]);
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [data, setData] = useState({});
  const [open, setIsOpen] = useState(false);

  useEffect(() => {
    setStateData(State.getStatesOfCountry(country?.isoCode));
  }, [country]);

  useEffect(() => {
    setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
  }, [state]);

  useEffect(() => {
    stateData && setState(stateData[0]);
  }, [stateData]);

  useEffect(() => {
    cityData && setCity(cityData[0]);
  }, [cityData]);

  const getWeatherDetails = () => {
    if (!city) return;

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${apiKey}`;
    axios
      .get(apiURL)
      .then((res) => {
        setData(res.data);
        setIsOpen(true);
      })
      .catch((err) => {
        console.log("Error fetching weather data:", err);
      });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 flex items-center justify-between w-full p-4 bg-blue-300">
        <h1 className="text-2xl font-medium">Weather App</h1>
        <button
          className="h-full px-5 py-2 text-white bg-gray-950 rounded-full shadow-md shadow-[#0007]"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
      <section className="flex flex-col items-center justify-center w-full min-h-screen gap-8 bg-gray-950">
        <div className="p-2 lg:p-8 space-y-4 bg-blue-300 rounded-lg shadow-md shadow-[#0007]">
          <h2 className="text-2xl font-bold text-white drop-shadow-md">
            Select Country, State, and City
          </h2>
          <div className="flex flex-col justify-center gap-4 lg:items-end lg:flex-row">
            <div className="space-y-4">
              <p className="font-medium text-black">Country :</p>
              <Selector
                data={countryData}
                selected={country}
                setSelected={setCountry}
              />
            </div>
            {state && (
              <div className="space-y-4">
                <p className="font-medium text-black">State :</p>
                <Selector
                  data={stateData}
                  selected={state}
                  setSelected={setState}
                />
              </div>
            )}
            {city && (
              <div className="space-y-4">
                <p className="font-medium text-black">City :</p>
                <Selector
                  data={cityData}
                  selected={city}
                  setSelected={setCity}
                />
              </div>
            )}
            <button
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
              onClick={getWeatherDetails}
            >
              Get Weather
            </button>
          </div>
        </div>
        <div
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setIsOpen(false);
            }
          }}
          className={`${open ? " h-screen" : "h-0"
            } w-full bg-[#0008] fixed top-0 left-0 flex justify-center items-center backdrop-blur-sm overflow-hidden duration-200`}
        >
          {Object.keys(data).length > 0 && (
            <div className="backdrop-blur-md bg-[#fff] p-4 rounded-lg shadow-lg shadow-[#0007] space-y-4 relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-0 right-0 px-6 py-2 text-lg font-semibold text-white translate-x-1/2 -translate-y-1/2 bg-red-400 rounded-full"
              >
                close
              </button>
              <h4>
                <span className="font-medium">Weather Details of City :</span>{" "}
                {data?.name}
              </h4>
              <h4>
                <span className="font-medium">Current Temperature :</span>{" "}
                {(data?.main?.temp - 273.15).toFixed(2)}°C
              </h4>
              <h4>
                <span className="font-medium">Humidity :</span>{" "}
                {data?.main?.humidity}
              </h4>
              <h4>
                <span className="font-medium">Sea Level :</span>{" "}
                {data?.main?.pressure}
              </h4>
              <h4>
                <span className="font-medium">Ground Level :</span>{" "}
                {data?.wind?.deg}
              </h4>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Main;
