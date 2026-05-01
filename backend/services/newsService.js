const newsRepository = require('../repositories/newsRepository');
const { ServiceError } = require('./serviceError');
const mediaService = require('./mediaService');
const { escapeRegex, parsePagination } = require('./queryUtils');

const listNews = async ({ category, search, page, limit }) => {
  const query = {};

  if (category && category !== 'All') {
    query.category = category;
  }

  if (search && typeof search === 'string') {
    const escaped = escapeRegex(search);
    query.$or = [
      { title: { $regex: escaped, $options: 'i' } },
      { description: { $regex: escaped, $options: 'i' } }
    ];
  }

  if (page !== undefined && limit !== undefined) {
    const { page: parsedPage, limit: parsedLimit, skip } = parsePagination({
      page,
      limit,
      defaultLimit: 9,
      maxLimit: 100
    });

    const totalItems = await newsRepository.count(query);
    const totalPages = Math.ceil(totalItems / parsedLimit);
    const news = await newsRepository
      .find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(parsedLimit);

    return { news, totalItems, totalPages, page: parsedPage };
  }

  const news = await newsRepository.find(query).sort({ date: -1 });
  return news;
};

const createNews = async ({ data, files }) => {
  const { title, description, date, category } = data;

  if (!title || !description || !date || !category) {
    throw new ServiceError('All fields are required.', 400);
  }

  if (Number.isNaN(new Date(date).getTime())) {
    throw new ServiceError('Invalid date format.', 400);
  }

  const images = files && files.length > 0
    ? await mediaService.uploadImages(files, {
        folder: 'news',
        allowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp']
      })
    : [];

  const news = await newsRepository.create({
    title,
    description,
    date,
    category,
    images
  });

  return news;
};

const updateNews = async ({ newsId, data, files }) => {
  const { title, description, date, category, keepImages } = data;

  if (!title || !description || !date || !category) {
    throw new ServiceError('Missing required fields.', 400);
  }

  if (Number.isNaN(new Date(date).getTime())) {
    throw new ServiceError('Invalid date format.', 400);
  }

  const news = await newsRepository.findById(newsId);
  if (!news) {
    throw new ServiceError('News not found.', 404);
  }

  news.title = title;
  news.description = description;
  news.date = date;
  news.category = category;

  let keepPublicIds = [];
  if (keepImages) {
    try {
      keepPublicIds = JSON.parse(keepImages);
    } catch (error) {
      keepPublicIds = [];
    }
  }

  if (Array.isArray(news.images)) {
    for (const img of news.images) {
      if (!keepPublicIds.includes(img.public_id)) {
        try {
          await mediaService.deleteByPublicId(img.public_id);
        } catch (error) {
          // Ignore deletion errors
        }
      }
    }
  }

  let keptImages = [];
  if (Array.isArray(news.images)) {
    keptImages = keepPublicIds
      .map((pid) => news.images.find((img) => img.public_id === pid))
      .filter(Boolean);
  }

  if (files && files.length > 0) {
    const newImages = await mediaService.uploadImages(files, {
      folder: 'news',
      allowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp']
    });
    keptImages = [...keptImages, ...newImages];
  }

  news.images = keptImages;
  const updated = await news.save();
  return updated;
};

const deleteNews = async ({ newsId }) => {
  const news = await newsRepository.findById(newsId);
  if (!news) {
    throw new ServiceError('News not found.', 404);
  }

  if (Array.isArray(news.images)) {
    for (const img of news.images) {
      try {
        await mediaService.deleteByPublicId(img.public_id);
      } catch (error) {
        // Ignore deletion errors
      }
    }
  }

  await news.deleteOne();
  return { message: 'News deleted.' };
};

module.exports = {
  listNews,
  createNews,
  updateNews,
  deleteNews
};
