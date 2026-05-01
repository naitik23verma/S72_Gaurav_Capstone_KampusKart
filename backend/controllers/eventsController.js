const eventsService = require('../services/eventsService');
const { handleServiceError } = require('./controllerUtils');

const listEvents = async (req, res) => {
  try {
    const result = await eventsService.listEvents(req.query);
    res.json(result);
  } catch (error) {
    handleServiceError(res, error, error.message);
  }
};

const createEvent = async (req, res) => {
  try {
    const event = await eventsService.createEvent({
      data: req.body,
      file: req.file
    });
    res.status(201).json(event);
  } catch (error) {
    handleServiceError(res, error, error.message);
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await eventsService.updateEvent({
      eventId: req.params.id,
      data: req.body,
      file: req.file
    });
    res.json(event);
  } catch (error) {
    handleServiceError(res, error, error.message);
  }
};

const deleteEvent = async (req, res) => {
  try {
    const result = await eventsService.deleteEvent({ eventId: req.params.id });
    res.json(result);
  } catch (error) {
    handleServiceError(res, error, error.message);
  }
};

module.exports = {
  listEvents,
  createEvent,
  updateEvent,
  deleteEvent
};
