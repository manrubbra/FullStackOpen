const Country = ({ countries }) => {
  console.log('#DEBUG - Component - Lenght:', countries.length);

  if (countries.length > 5) {
    return (
      <div>
        <p>There are several coincidences ({countries.length})</p>
      </div>
    );
  } else if (countries.length == 1) {
    var selected = countries[0];
    return (
      <div>
        <div>
          <h3>{selected.name.common}</h3>
          <hr></hr>
          <div>
            {selected.capital.map((c) => (
              <p>Capital: {c}</p>
            ))}
            <p>Area: {selected.area} m2</p>
            <h4>Languages:</h4>
            <ul>
              {Object.values(selected.languages).map((c) => (
                <li>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <table>
          <tbody>
            {countries.map((c) => (
              <tr key={c.ccn3}>
                <td>{c.flag}</td>
                <td>|</td>
                <td>{c.name.common}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default Country;
