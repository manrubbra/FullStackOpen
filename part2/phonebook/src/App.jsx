import { useState, useEffect } from 'react';
import CustomTitle from './components/CustomTitle';
import Agenda from './components/Agenda';
import InputGroup from './components/InputGroup';
import axios from 'axios';

const App = () => {
  useEffect(() => {
    console.log('effect');

    const eventHandler = (response) => {
      var aux = response.data;
      console.log('#DEBUG (AXIOS) - ', response.data);

      setPersons(aux);
      setBackupPersons(aux);
    };

    const promise = axios.get('http://localhost:3001/persons');
    promise.then(eventHandler);
  }, []);

  // Hook to chage the title of Agenda area
  const [agendaTitle, setAgendaTitle] = useState('Agenda');

  // Hook to change the person list which is shown
  const [persons, setPersons] = useState([]);

  // Hook to keep the real agenda (with no filter) and it's not shown
  const [backupPersons, setBackupPersons] = useState([]);

  //#region Filter. Everything regarding to the filter area

  // Hook to control the filter criteria
  const [filter, setFilter] = useState('');

  // Cotrol of event, filter input changes
  const onChangeFilter = (event) => {
    filterAgenda(event.target.value);
  };

  // Function which filter the agende according to the criteria (filter)
  const filterAgenda = (filter) => {
    console.log('#DEBUG - Filter', filter);
    setFilter(filter);

    if (filter != '') {
      var auxPersons = [];

      backupPersons.forEach((p) => {
        if (p.name.toLowerCase().includes(filter.toLowerCase())) {
          auxPersons = auxPersons.concat(p);
        }
      });

      setAgendaTitle('Agenda (filtered)');
      setPersons(auxPersons);
    } else {
      setPersons(backupPersons);
    }
  };

  // Control of event in order to wipe the filter criteria
  const onClickFilter = (event) => {
    console.log('#DEBUG - Filter click');

    setPersons(backupPersons);
    setFilter('');
    setAgendaTitle('Agenda');
  };

  //#endregion

  //#region New contact

  // Hook to save the new contact
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: '',
    id: 0
  });

  // Control event of the new contact name
  const onChangeName = (event) => {
    var updateNewPerson = { ...newPerson, name: event.target.value };
    console.log('#DEBUG - ', updateNewPerson);
    setNewPerson(updateNewPerson);
  };

  // Control event of the new contact number
  const onChangeNumber = (event) => {
    var updateNewPerson = { ...newPerson, number: event.target.value };
    console.log('#DEBUG - ', updateNewPerson);
    setNewPerson(updateNewPerson);
  };

  // Control event add new contact
  const onClickNewContact = (event) => {
    if (backupPersons.find((p) => p.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to the phonebook`);
      return;
    }

    var auxContact = { ...newPerson, id: backupPersons.length + 1 };

    setBackupPersons(backupPersons.concat(auxContact));

    filterAgenda(filter);

    setNewPerson({
      name: '',
      number: '',
      id: 0
    });
  };

  //#endregion

  return (
    <div>
      <CustomTitle level="1" title="Phonebook Exercise" />
      <hr></hr>
      <div>
        <CustomTitle level="4" title="Filter" />
        <InputGroup
          labels={['Criteria']}
          inputs={[filter]}
          onChanges={[onChangeFilter]}
          buttonLabels={['Clear filter']}
          buttonOnClicks={[onClickFilter]}
        />
      </div>
      <hr></hr>
      <div>
        <CustomTitle level="4" title="New contact" />
        <InputGroup
          labels={['Name', 'Number']}
          inputs={[newPerson.name, newPerson.number]}
          onChanges={[onChangeName, onChangeNumber]}
          buttonLabels={['Add new contact']}
          buttonOnClicks={[onClickNewContact]}
        />
      </div>
      <hr></hr>
      <div>
        <CustomTitle level="4" title={agendaTitle} />
        <Agenda persons={persons} />
      </div>
    </div>
  );
};

export default App;
