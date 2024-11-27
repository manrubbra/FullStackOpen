const blogsRouter = require('express').Router();
const logger = require('../utils/logger');
const Blog = require('../models/blog');

blogsRouter.get('/', (request, response, next) => {
  logger.debug('Call to GET method from Blog Model');
  Blog.find({})
    .then((blogs) => {
      logger.debug('Status code 200');
      logger.debug(blogs);
      response.json(blogs);
    })
    .catch((error) => {
      next(error);
    });
});

blogsRouter.post('/', (request, response, next) => {
  logger.debug(request.body);
  const blog = new Blog(request.body);

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
      logger.debug('Status code 201');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = blogsRouter;
