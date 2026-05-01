const LostFoundItem = require('../models/LostFoundItem');

const find = (filter) => LostFoundItem.find(filter);
const findOne = (filter) => LostFoundItem.findOne(filter);
const findById = (id) => LostFoundItem.findById(id);
const create = (data) => LostFoundItem.create(data);
const count = (filter) => LostFoundItem.countDocuments(filter);
const deleteOne = (filter) => LostFoundItem.deleteOne(filter);

module.exports = {
  find,
  findOne,
  findById,
  create,
  count,
  deleteOne
};
