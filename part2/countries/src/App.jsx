import { useState, useEffect } from 'react';
import countryService from './services/CountryService';
import Country from './components/Country';

const App = () => {
  // Hook for filter
  const [filter, setFilter] = useState('');

  // Hook for the countries
  const [countries, setCountries] = useState([]);
  const [showCountries, setShowCountries] = useState([]);

  // Render the page
  useEffect(() => {
    countryService.getAll().then((data) => {
      console.log(data);
      setCountries(data);
      setShowCountries(data);
    });
  }, []);

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
      // Update country list
      setShowCountries(aux);
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
    </div>
  );
};

export default App;
