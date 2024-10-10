const Agenda = ({ persons }) => {
  console.log('#DEBUG - ', persons);
  return (
    <div>
      <table>
        <tbody>
          {persons.map((p) => (
            <tr key={p.id}>
              <td>Id: {p.id}</td>
              <td>|</td>
              <td>Name: {p.name}</td>
              <td>|</td>
              <td>Number: {p.number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Agenda;
