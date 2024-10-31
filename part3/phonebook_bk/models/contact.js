require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

console.log('#DEBUG -> Connecting to ', url);

mongoose
  .connect(url)
  .then((result) => {
    console.log('#DEBUG -> Connected to DB');
  })
  .catch((error) => {
    console.log('#ERROR -> Message:', error.message);
  });

const contactSchema = new mongoose.Schema({
  name: String,
  number: String
});

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Contact', contactSchema);
