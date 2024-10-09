import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', id: 1 }]);
  const [newName, setNewName] = useState('');

  const onChangeInput = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const onSubmitButton = (event) => {
    if (persons.find((p) => p.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    var updateAgenda = persons.concat({
      name: newName,
      id: persons.length + 1
    });
    setPersons(updateAgenda);
    setNewName('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={onChangeInput} />
        </div>
        <div>
          <button type="button" onClick={onSubmitButton}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </div>
    </div>
  );
};

export default App;
