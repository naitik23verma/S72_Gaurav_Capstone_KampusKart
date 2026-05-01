const facilitiesService = require('../services/facilitiesService');
const { handleServiceError } = require('./controllerUtils');

const listFacilities = async (req, res) => {
  try {
    const result = await facilitiesService.listFacilities(req.query);
    res.json(result);
  } catch (error) {
    handleServiceError(res, error, error.message);
  }
};

const createFacility = async (req, res) => {
  try {
    const facility = await facilitiesService.createFacility({
      data: req.body,
      files: req.files
    });
    res.status(201).json(facility);
  } catch (error) {
    handleServiceError(res, error, error.message);
  }
};

const updateFacility = async (req, res) => {
  try {
    const facility = await facilitiesService.updateFacility({
      facilityId: req.params.id,
      data: req.body,
      files: req.files
    });
    res.json(facility);
  } catch (error) {
    handleServiceError(res, error, error.message);
  }
};

const deleteFacility = async (req, res) => {
  try {
    const result = await facilitiesService.deleteFacility({ facilityId: req.params.id });
    res.json(result);
  } catch (error) {
    handleServiceError(res, error, error.message);
  }
};

module.exports = {
  listFacilities,
  createFacility,
  updateFacility,
  deleteFacility
};
