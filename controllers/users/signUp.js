const { User } = require('../../models/user');
const { HttpError } = require('../../utils');

const bcrypt = require('bcrypt');

const signUp = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) throw HttpError(409, 'Email already exist');

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashedPassword });

  res.status(201).json({ email: newUser.email, name: newUser.name });
};

module.exports = signUp;
