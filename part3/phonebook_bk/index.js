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

app.get('/api/persons', (request, response) => {
  console.log(request);
  response.json(contacts);
});

app.get('/api/persons/:id', (request, response) => {
  var id = request.params.id;
  console.log('#DEBUG -> Id: ', id);

  var contact = contacts.find((c) => c.id == id);

  if (contact) {
    response.json(contact);
  } else {
    console.log('Contact not found!');
    response.status(404).end();
  }
});

app.get('/info', (request, response) => {
  console.log('#DEBUG -> Call to info');

  let htmlResponse = `<p>Phonebook has info for ${contacts.length} people</p>`;
  htmlResponse += '<br/>';
  htmlResponse += `<p>${new Date()}</p>`;

  response.send(htmlResponse);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
