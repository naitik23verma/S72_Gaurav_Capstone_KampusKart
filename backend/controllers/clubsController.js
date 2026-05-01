const clubsService = require('../services/clubsService');
const { handleServiceError } = require('./controllerUtils');

const listClubs = async (req, res) => {
  try {
    const result = await clubsService.listClubs(req.query);
    res.json(result);
  } catch (error) {
    handleServiceError(res, error, error.message);
  }
};

const createClub = async (req, res) => {
  try {
    const club = await clubsService.createClub({
      data: req.body,
      file: req.file
    });
    res.status(201).json(club);
  } catch (error) {
    handleServiceError(res, error, error.message);
  }
};

const updateClub = async (req, res) => {
  try {
    const club = await clubsService.updateClub({
      clubId: req.params.id,
      data: req.body,
      file: req.file
    });
    res.json(club);
  } catch (error) {
    handleServiceError(res, error, error.message);
  }
};

const deleteClub = async (req, res) => {
  try {
    const result = await clubsService.deleteClub({ clubId: req.params.id });
    res.json(result);
  } catch (error) {
    handleServiceError(res, error, error.message);
  }
};

module.exports = {
  listClubs,
  createClub,
  updateClub,
  deleteClub
};
