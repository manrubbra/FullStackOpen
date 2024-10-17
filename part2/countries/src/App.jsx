import { useState, useEffect } from 'react';
import countryService from './services/CountryService';
import WeatherService from './services/WeatherService';
import Country from './components/Country';
import Weather from './components/CityWeather';

const App = () => {
  // Hook for filter
  const [filter, setFilter] = useState('');

  // Hook for the countries
  const [countries, setCountries] = useState([]);
  const [showCountries, setShowCountries] = useState([]);

  // Hook for the weather country
  const [countrySelected, setCountrySelected] = useState(null);
  const [weatherInfo, setWeatherInfo] = useState(null);

  // Render the page
  useEffect(() => {
    countryService.getAll().then((data) => {
      console.log(data);
      setCountries(data);
      setShowCountries(data);
    });
  }, []);

  // Render the weather
  useEffect(() => {
    if (null != countrySelected) {
      console.log('#DEBUG - Country selected', countrySelected);
      WeatherService.getWeather(
        countrySelected.capital[0],
        countrySelected.cca2
      ).then((data) => setWeatherInfo(data));
    } else {
      console.log('#DEBUG - Country selected RESET', countrySelected);
      setWeatherInfo(null);
    }
  }, [countrySelected]);

  //** This method control the event of change filter value */
  const onFilterChange = (event) => {
    // New value for the filter variable
    var newFilter = event.target.value.toLowerCase();

    console.log('#DEBUG - onFilterChange: ', newFilter);
    // Set the original value because the toLower is apply to compare
    setFilter(event.target.value);

    var aux = [];

    if (event.target.value != '') {
      countries.forEach((c) => {
        if (c.name.common.toLowerCase().includes(newFilter)) {
          aux = aux.concat(c);
        }
      });
      console.log('#DEBUG - Change filete. Countries filtered:', aux.length);
      // Update country list if the length change
      console.log('# DEBUG - Lenght aux:', aux.length);
      console.log('# DEBUG - Lenght show:', showCountries.length);
      if (aux.length != showCountries.length) {
        console.log('# DEBUG - Set list !!!!');
        setShowCountries(aux);
        // Set the country selected to modify the weather component
        if (aux.length == 1) {
          console.log('#DEBUG - Set the country', aux[0].name.common);
          setCountrySelected(aux[0]);
        } else {
          setCountrySelected(null);
        }
      }
    } else {
      // Reset the country list
      setShowCountries(countries);
    }
  };

  //**This method is used to reviece all clicks over the details buttons */
  const onClickShowDetails = (countryName) => {
    console.log('#DEBUG - Click on detail button: ', countryName);
    var country = countries.find((c) => c.name.common == countryName);
    // Changet the filter
    setFilter(countryName);
    // Set just one element in the country list to show
    setShowCountries([country]);
    setCountrySelected(country);
  };

  return (
    <div>
      <h1>Country Finder</h1>
      <hr></hr>
      <div>
        <p>Filter:</p>
        <input value={filter} onChange={onFilterChange}></input>
      </div>
      <hr></hr>
      <Country countries={showCountries} onClick={onClickShowDetails} />
      <Weather weatherInfo={weatherInfo} />
    </div>
  );
};

export default App;
