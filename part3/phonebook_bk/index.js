const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// Contact module
const Contact = require('./models/contact');

// Load the variables from environment variables file
require('dotenv').config();

const app = express();

morgan.token('body', function (req, res) {
  return JSON.stringify(req.body);
});

// This line allow us to show the front
app.use(express.static('dist'));
app.use(cors());
app.use(express.json());
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      `(${tokens.res(req, res, 'content-length')})`,
      '-',
      tokens['response-time'](req, res),
      'ms',
      '-',
      tokens.body(req, res)
    ].join(' ');
  })
);

// Something like a cache
let contacts = [];

/** Get all contacts from Contacts */
app.get('/api/persons', (request, response) => {
  console.log('#DEBUG -> Retrieve contacts from DB');
  Contact.find({}).then((result) => {
    console.log('#DEBUG -> Result:', result);
    contacts = result;
    response.json(result);
  });
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

//** Create a new contact */
app.post('/api/persons', (request, response) => {
  console.log(request.body);

  // Change this line because I need to do an object copy. If I
  // keep a simple equal sign the reques object remains linked to the
  // new object and the change over it are doing in the request
  // object too, and the custom morgan middleware show the object
  // with ID when it shouldn't do it.
  var contact = { ...request.body };

  // Object is null
  if (!contact || null == contact) {
    console.log('#DEBUG -> Null object');
    response.json({ error: 'Null object' }).status(400).end();
    return;
  }

  // Name is null or empty
  if (contact.name == null || contact.name == '') {
    console.log('#DEBUG -> Name is null or empty');
    response.json({ error: 'Name is null or empty' }).status(400).end();
    return;
  }

  // Number is null or empty
  if (contact.number == '' || contact.number == null) {
    console.log('#DEBUG -> Number is null or empty');
    response.json({ error: 'Number is null or empty' }).status(400).end();
    return;
  }

  // If exists the name in the agenda throw the bad request with error
  if (
    contacts.find((c) => c.name.toLowerCase() == contact.name.toLowerCase())
  ) {
    console.log('#DEBUG -> The contact already exists');
    response.json({ error: 'The contact already exists' }).status(400).end();
    return;
  }

  const newContact = new Contact({
    name: contact.name,
    number: contact.number
  });

  console.log('#DEBUG -> New contact added');
  newContact.save().then((result) => {
    console.log('#DEBUG -> New contact:', result);
    contacts = contacts.concat(result);
    // Response the request with the new contact
    response.json(contact);
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
