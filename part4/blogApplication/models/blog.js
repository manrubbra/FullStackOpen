const config = require('../utils/config');
const logger = require('../utils/logger');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = config.MONGODB_URI;

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
});

mongoose
  .connect(url, {
    retryWrites: true,
    wtimeoutMS: 60000, // Timeout de escritura en milisegundos
    connectTimeoutMS: 60000
  })
  .then((result) => {
    logger.debug('Connected to DB');
  })
  .catch((error) => {
    logger.error(`Message: ${error.message}`);
  });

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Blog', blogSchema);
