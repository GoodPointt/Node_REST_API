const { Contact } = require('../models/contact');

const { HttpError, ctrlWrapper } = require('../utils');

const listAll = async (req, res) => {
  const result = await Contact.find({}, '-createdAt -updatedAt');
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  // const result = await Contact.findOne({ _id: contactId });
  const result = await Contact.findById(contactId);
  if (!result) throw HttpError(404, 'Not found');
  res.json(result);
};

const addNew = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) throw HttpError(404, 'Not found');

  res.json(result);
};

const updFavorite = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) throw HttpError(404, 'Not found');

  res.json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) throw HttpError(404, 'Not found');

  res.json(result);
};

module.exports = {
  listAll: ctrlWrapper(listAll),
  getById: ctrlWrapper(getById),
  addNew: ctrlWrapper(addNew),
  updById: ctrlWrapper(updById),
  updFavorite: ctrlWrapper(updFavorite),
  deleteById: ctrlWrapper(deleteById),
};
