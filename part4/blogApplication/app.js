const express = require('express');
const app = express();
const cors = require('cors');
const BlogRouter = require('./controllers/blogs');
const middleware = require('./utils/middleware');

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use('/api/blogs', BlogRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
