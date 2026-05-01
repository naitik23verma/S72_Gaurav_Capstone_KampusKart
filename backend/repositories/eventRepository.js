const Event = require('../models/Event');

const find = (filter) => Event.find(filter);
const findById = (id) => Event.findById(id);
const create = (data) => Event.create(data);
const count = (filter) => Event.countDocuments(filter);

module.exports = {
  find,
  findById,
  create,
  count
};
