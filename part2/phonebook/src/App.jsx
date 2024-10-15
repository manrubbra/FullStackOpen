import { useState, useEffect } from 'react';
import CustomTitle from './components/CustomTitle';
import Agenda from './components/Agenda';
import InputGroup from './components/InputGroup';
import personsServices from './services/persons';

const App = () => {
  useEffect(() => {
    console.log('effect');

    const promise = personsServices.getAll();

    promise.then((data) => {
      var aux = data;
      console.log('#DEBUG (Service Person) - ', data);

      setPersons(aux);
      setBackupPersons(aux);
    });
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
    filterAgenda(event.target.value, backupPersons);
  };

  // Function which filter the agende according to the criteria (filter)
  const filterAgenda = (filter, list) => {
    console.log('#DEBUG - Filter', filter);
    setFilter(filter);

    console.log('#DEBUG - Backup persons list', list);

    if (filter != '') {
      var auxPersons = [];

      list.forEach((p) => {
        if (p.name.toLowerCase().includes(filter.toLowerCase())) {
          auxPersons = auxPersons.concat(p);
        }
      });

      setAgendaTitle('Agenda (filtered)');
      setPersons(auxPersons);
    } else {
      setPersons(list);
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

  // Calculate the next ID
  const nextId = (contacts) => {
    var maxId = 0;

    contacts.forEach((c) => {
      if (parseInt(c.id) > maxId) maxId = parseInt(c.id);
    });

    return String(maxId + 1);
  };

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

    var auxContact = { ...newPerson, id: nextId(backupPersons) };

    setBackupPersons(backupPersons.concat(auxContact));

    filterAgenda(filter, backupPersons.concat(auxContact));

    // Keep the contact in the backend
    personsServices
      .create(auxContact)
      .then((data) => console.log('#DEBUG - New contact: ', data));

    setNewPerson({
      name: '',
      number: '',
      id: 0
    });
  };

  // Control event delete contact
  const onClickDelete = (event) => {
    console.log('#DEBUG - DELETE', event.target);

    var name = backupPersons.find((c) => c.id == event.target.id).name;

    if (window.confirm(`Do you really want to delete ${name}?`)) {
      personsServices.remove(event.target.id).then((data) => {
        console.log('#DEBUG - Contact deleted', data);
        // Place hera the call to the GetAll because the promise is
        // async
        personsServices.getAll().then((data) => {
          var aux = data;
          console.log('#DEBUG (Service Person) - ', data);
          // Update the variables
          setPersons(aux);
          setBackupPersons(aux);
          filterAgenda(filter, aux);
        });
      });
    }
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
        <Agenda persons={persons} onClickDelete={onClickDelete} />
      </div>
    </div>
  );
};

export default App;
