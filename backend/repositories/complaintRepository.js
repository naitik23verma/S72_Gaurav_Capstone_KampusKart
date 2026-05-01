const Complaint = require('../models/Complaint');

const find = (filter) => Complaint.find(filter);
const findById = (id) => Complaint.findById(id);
const create = (data) => Complaint.create(data);
const count = (filter) => Complaint.countDocuments(filter);
const deleteOne = (filter) => Complaint.deleteOne(filter);

module.exports = {
  find,
  findById,
  create,
  count,
  deleteOne
};
