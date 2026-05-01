const Facility = require('../models/Facility');

const find = (filter) => Facility.find(filter);
const findById = (id) => Facility.findById(id);
const create = (data) => Facility.create(data);
const count = (filter) => Facility.countDocuments(filter);

module.exports = {
  find,
  findById,
  create,
  count
};
