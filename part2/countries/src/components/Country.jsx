const Country = ({ countries, onClick }) => {
  console.log('#DEBUG - Component - Lenght:', countries.length);

  // With this conditions render different elements in base of
  // the number of register
  if (countries.length > 5) {
    // More than five matches
    return (
      <div>
        <p>There are several coincidences ({countries.length})</p>
      </div>
    );
  } else if (countries.length == 1) {
    // Just one match (automatic show details)
    var selected = countries[0];
    return (
      <div>
        <div>
          <h3>Details of: {selected.name.common}</h3>
          <hr></hr>
          <div>
            {selected.capital.map((c) => (
              <p key={c}>Capital: {c}</p> // Key value forced in order to avoid the console error
            ))}
            <p>Area: {selected.area} m2</p>
            <h4>Languages:</h4>
            <ul>
              {Object.values(selected.languages).map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <img src={selected.flags.png} alt="Country flag" />
          </div>
        </div>
      </div>
    );
  } else {
    // Less than five matches
    return (
      <div>
        <table>
          <tbody>
            {countries.map((c) => (
              <tr key={c.ccn3}>
                <td>{c.flag}</td>
                <td>|</td>
                <td>{c.name.common}</td>
                <td>|</td>
                <td>
                  <button type="button" onClick={() => onClick(c.name.common)}>
                    Show details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default Country;
