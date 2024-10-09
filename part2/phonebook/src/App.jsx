import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '4545454545' }
  ]);
  const [newPerson, setNewPerson] = useState({ name: '', number: '' });

  const onChangeName = (event) => {
    var updateNewPerson = { ...newPerson };
    updateNewPerson.name = event.target.value;
    console.log(updateNewPerson);
    setNewPerson(updateNewPerson);
  };

  const onChangeNumber = (event) => {
    var updateNewPerson = { ...newPerson };
    updateNewPerson.number = event.target.value;
    console.log(updateNewPerson);
    setNewPerson(updateNewPerson);
  };

  const onSubmitButton = (event) => {
    if (persons.find((p) => p.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to the phonebook`);
      return;
    }

    var updateAgenda = persons.concat({
      ...newPerson,
      id: persons.length + 1
    });
    setPersons(updateAgenda);
    setNewPerson({ name: '', number: '' });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          <div>
            name:
            <input value={newPerson.name} onChange={onChangeName} />
          </div>
          <div>
            number:
            <input value={newPerson.number} onChange={onChangeNumber} />
          </div>
        </div>
        <div>
          <button type="button" onClick={onSubmitButton}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {persons.map((p) => (
            <li key={p.id}>
              {p.name} - {p.number}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
