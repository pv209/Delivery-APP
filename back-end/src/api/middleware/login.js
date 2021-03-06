const { StatusCodes: { BAD_REQUEST, NOT_FOUND } } = require('http-status-codes');
const { loginSchema } = require('../validations/schema');
const { User: users } = require('../../database/models');

const login = async (req, _res, next) => {
  const { error } = loginSchema.validate(req.body);
  const { email, password } = req.body; 

  if (error) return next({ statusCode: BAD_REQUEST, message: error.message });
  const checkIfUserExists = await users.findOne({ where: { email, password } });
  if (!checkIfUserExists) return next({ statusCode: NOT_FOUND, message: 'Invalid fields' });
  next();
  };
  module.exports = login; 
