const fs = require('fs/promises');
const path = require('path');
const gravatar = require('gravatar');

const { User } = require('../../models/user');
const { HttpError } = require('../../utils');

const bcrypt = require('bcrypt');

const signUp = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) throw HttpError(409, 'Email already exist');

  const hashedPassword = await bcrypt.hash(password, 10);

  let avatarURL = '';

  if (!req.file) {
    avatarURL = gravatar.url(email);
  }

  if (req.file) {
    const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');
    const { path: tempUpload, originalname } = req.file;
    const filename = `${Date.now()}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);
    avatarURL = path.join('avatars', filename);
  }

  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    avatarURL,
  });

  res.status(201).json({ email: newUser.email, name: newUser.name });
};

module.exports = signUp;
