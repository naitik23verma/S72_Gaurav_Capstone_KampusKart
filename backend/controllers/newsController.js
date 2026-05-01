const newsService = require('../services/newsService');
const { handleServiceError } = require('./controllerUtils');

const listNews = async (req, res) => {
  try {
    const result = await newsService.listNews(req.query);
    res.json(result);
  } catch (error) {
    handleServiceError(res, error, error.message);
  }
};

const createNews = async (req, res) => {
  try {
    const news = await newsService.createNews({
      data: req.body,
      files: req.files
    });
    res.status(201).json(news);
  } catch (error) {
    handleServiceError(res, error, error.message);
  }
};

const updateNews = async (req, res) => {
  try {
    const news = await newsService.updateNews({
      newsId: req.params.id,
      data: req.body,
      files: req.files
    });
    res.json(news);
  } catch (error) {
    handleServiceError(res, error, error.message);
  }
};

const deleteNews = async (req, res) => {
  try {
    const result = await newsService.deleteNews({ newsId: req.params.id });
    res.json(result);
  } catch (error) {
    handleServiceError(res, error, error.message);
  }
};

module.exports = {
  listNews,
  createNews,
  updateNews,
  deleteNews
};
