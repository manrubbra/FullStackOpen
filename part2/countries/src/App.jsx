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

  // Event control filter change
  const onFilterChange = (event) => {
    console.log('#DEBUG - onFilterChange: ', event.target.value);

    setFilter(event.target.value);

    var aux = [];

    if (event.target.value != '') {
      countries.forEach((c) => {
        if (
          c.name.common.toLowerCase().includes(event.target.value.toLowerCase())
        ) {
          aux = aux.concat(c);
        }
      });
      console.log('#DEBUG - Change filete. Countries filtered:', aux.length);
      setShowCountries(aux);
    } else {
      setShowCountries(countries);
    }
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
      <Country countries={showCountries} />
    </div>
  );
};

export default App;
