const contacts = require('../models/contacts');
const { HttpError, ctrlWrapper } = require('../utils');

const listAll = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) throw HttpError(404, 'Not found');
  res.json(result);
};

const addNew = async (req, res) => {
  const result = await contacts.addContact(req.body);

  res.status(201).json(result);
};

const updById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);

  if (!result) throw HttpError(404, 'Not found');

  res.json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);

  if (!result) throw HttpError(404, 'Not found');

  res.json(result);
};

module.exports = {
  listAll: ctrlWrapper(listAll),
  getById: ctrlWrapper(getById),
  addNew: ctrlWrapper(addNew),
  updById: ctrlWrapper(updById),
  deleteById: ctrlWrapper(deleteById),
};
