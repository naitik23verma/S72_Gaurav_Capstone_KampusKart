const ClubRecruitment = require('../models/ClubRecruitment');

const find = (filter) => ClubRecruitment.find(filter);
const findById = (id) => ClubRecruitment.findById(id);
const create = (data) => ClubRecruitment.create(data);
const count = (filter) => ClubRecruitment.countDocuments(filter);

module.exports = {
  find,
  findById,
  create,
  count
};
