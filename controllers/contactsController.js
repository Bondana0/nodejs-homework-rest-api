import { HttpError } from '../helpers/index.js';
import ctrWrapper from '../decorators/ctrlWrapper.js';
import Contact from '../template/Contact.js';

export const getAll = async (req, res) => {
  const data = await Contact.find();
  res.json(data);
};

export const getById = async (req, res) => {
  const { id } = req.params;
  const data = await Contact.findById(id);
  if (!data) {
    throw HttpError(404);
  }
  res.json(data);
};

// --------

export const postAddContact = async (req, res) => {
  const data = await Contact.create(req.body);
  res.status(201).json(data);
};

// --------

export const delContact = async (req, res) => {
  const { id } = req.params;
  const data = await Contact.findByIdAndDelete(id);

  if (!data) {
    throw HttpError(404);
  }

  res.status(200).json({ message: 'contact deleted' });
};

// -------

export const updateContact = async (req, res) => {
  const { id } = req.params;

  const data = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!data) {
    throw HttpError(404);
  }

  res.json(data);
};

export default {
  getAll: ctrWrapper(getAll),
  getById: ctrWrapper(getById),
  postAddContact: ctrWrapper(postAddContact),
  delContact: ctrWrapper(delContact),
  updateContact: ctrWrapper(updateContact),
};
