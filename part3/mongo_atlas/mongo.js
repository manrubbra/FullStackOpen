console.log('#DEBUG -> Mongo test');

// Import the mongoose
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

// Addtional
const url =
  'mongodb+srv://manrubbra:{password}@phonebook.phpca.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Phonebook';

const contactSchema = new mongoose.Schema({
  id: BigInt,
  name: String,
  number: String
});

const Contact = mongoose.model('Contact', contactSchema);

// Functions
const createContact = (arguments) => {
  console.log('#DEBUG -> Create new contact');
  console.log('#DEBUG -> Parameters', arguments);

  var password = arguments[0];
  var contactName = arguments[1];
  var contactNumber = arguments[2];
  var link = url.replace('{password}', password);

  console.log('#DEBUG -> URL:', link);
  console.log('#DEBUG -> Name:', contactName);
  console.log('#DEBUG -> Number:', contactNumber);

  mongoose.connect(link);

  const contact = new Contact({ name: contactName, number: contactNumber });

  contact.save().then((result) => {
    console.log(
      `added ${contactName} with number ${contactNumber} to phonebook`
    );
    mongoose.connection.close();
    mongoose.disconnect();
  });
};

const getContacts = (arguments) => {
  console.log('#DEBUG -> Get all contacts');
  console.log('#DEBUG -> Parameters', arguments);

  var password = arguments[0];
  var link = url.replace('{password}', password);

  console.log('#DEBUG -> URL', link);

  mongoose.connect(link);

  Contact.find({}).then((result) => {
    console.log('#DEBUG -> Retreive from DB', result);
    console.log('Phonebook:');
    result.forEach((c) => {
      console.log(`${c.name} - ${c.number}`);
    });
    mongoose.connection.close();
    mongoose.disconnect();
  });
};

// Count the parameters
var numberOfParameters = process.argv.length;

if (numberOfParameters < 3) {
  console.log('#WARNING -> You should provide the parameters');
  process.exit(1);
} else if (numberOfParameters == 3) {
  console.log('#DEBUG -> Just the password retrieve data from DB');
  getContacts(process.argv.slice(-1));
} else if (numberOfParameters == 5) {
  console.log('#DEBUG -> Password and contact');
  createContact(process.argv.slice(-3));
} else {
  console.log('#WARNING -> There are more parameters than allowed');
  process.exit(1);
}
