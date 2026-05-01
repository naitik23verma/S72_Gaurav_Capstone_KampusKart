const Chat = require('../models/Chat');

const find = (filter) => Chat.find(filter);
const findById = (id) => Chat.findById(id);
const create = (data) => Chat.create(data);
const count = (filter) => Chat.countDocuments(filter);
const findDeletedWithAttachments = () => Chat.find({ isDeleted: true, attachments: { $exists: true, $ne: [] } });
const deleteById = (id) => Chat.findByIdAndDelete(id);

module.exports = {
  find,
  findById,
  create,
  count,
  findDeletedWithAttachments,
  deleteById
};
