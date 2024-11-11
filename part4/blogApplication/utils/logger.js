const info = (...params) => {
  console.log('#INFO ->', ...params);
};

const debug = (...params) => {
  console.log('#DEBUG ->', ...params);
};

const error = (...params) => {
  console.error('#ERROR ->', ...params);
};

module.exports = {
  info,
  debug,
  error
};
