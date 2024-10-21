const express = require('express');
const app = express();

let contacts = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122'
  }
];

/** Get all contacts from Contacts */
app.get('/api/persons', (request, response) => {
  console.log(request);
  response.json(contacts);
});

//** Get the contact with the same id */
app.get('/api/persons/:id', (request, response) => {
  var id = request.params.id;
  console.log('#DEBUG -> Id: ', id);

  var contact = contacts.find((c) => c.id == id);

  if (contact) response.json(contact);

  console.log('Contact not found!');
  response.status(404).end();
});

//** Get the status (number of contacts) at this moment */
app.get('/info', (request, response) => {
  console.log('#DEBUG -> Call to info');

  // Create the html base
  let htmlResponse = `<p>Phonebook has info for ${contacts.length} people</p>`;
  htmlResponse += '<br/>';
  htmlResponse += `<p>${new Date()}</p>`;

  response.send(htmlResponse);
});

//** Delete the contact with the specific Id */
app.delete('/api/persons/:id', (request, response) => {
  var id = request.params.id;
  console.log('#DEBUG -> Delete contact with id:');

  var contact = contacts.find((c) => c.id == id);

  if (!contact) {
    console.log('Contact not found!');
    response.status(404).end();
  }

  contacts = contacts.filter((c) => c.id != id);
  console.log('#DEBUG -> Contacts list filtered');

  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
