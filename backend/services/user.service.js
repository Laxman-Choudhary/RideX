const userModel = require('../models/user.model');

module.exports.createUser = async({ fullname, email, password }) => {
  if (
    !fullname ||
    !fullname.firstName ||
    !fullname.lastName ||
    !email ||
    !password
  ) {
    throw new Error('All fields are required');
  }
  const user = await userModel.create({
    fullname,
    email,
    password,
  });
  return user;
};