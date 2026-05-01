const News = require('../models/News');

const find = (filter) => News.find(filter);
const findById = (id) => News.findById(id);
const create = (data) => News.create(data);
const count = (filter) => News.countDocuments(filter);

module.exports = {
  find,
  findById,
  create,
  count
};
