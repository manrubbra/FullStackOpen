const CityWeather = ({ weatherInfo }) => {
  console.log('#DEBUG - Weather -', weatherInfo);

  if (null == weatherInfo) {
    return null;
  }

  // Icon
  var iconSource = `https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`;

  // Build param list tha I want to show:
  var params = [];

  // Temperature
  params.push(
    {
      id: 1,
      description: 'Temp',
      value: weatherInfo.main.temp,
      unit: 'ºF'
    },
    {
      id: 2,
      description: 'Temp. Min',
      value: weatherInfo.main.temp_min,
      unit: 'ºF'
    },
    {
      id: 3,
      description: 'Temp. Max',
      value: weatherInfo.main.temp_max,
      unit: 'ºF'
    }
  );

  console.log('#DEBUG - Weather param -', params);

  return (
    <div>
      <h2>Weather in {weatherInfo.name}</h2>
      <table>
        <tbody>
          {params.map((p) => (
            <tr key={p.id}>
              <td>{p.description}</td>
              <td>{p.value}</td>
              <td>{p.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <img src={iconSource} alt="Weather Icon" />
    </div>
  );
};

export default CityWeather;
