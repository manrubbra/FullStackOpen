import axios from 'axios';
// Change the URL because now is on the node server
// and the URL is relative
const baseUrl = '/api/persons';

// Get all contacts
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

// Create a new contact
const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

// Update the existing contact
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

// Delete the contact
const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export default { getAll, create, update, remove };
