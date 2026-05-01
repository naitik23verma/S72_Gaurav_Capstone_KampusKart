const facilityRepository = require('../repositories/facilityRepository');
const { ServiceError } = require('./serviceError');
const mediaService = require('./mediaService');
const { escapeRegex, parsePagination } = require('./queryUtils');

const listFacilities = async ({ type, search, page, limit }) => {
  const query = {};

  if (type && type !== 'All') {
    query.type = type;
  }

  if (search && typeof search === 'string') {
    const escaped = escapeRegex(search);
    query.$or = [
      { name: { $regex: escaped, $options: 'i' } },
      { description: { $regex: escaped, $options: 'i' } },
      { location: { $regex: escaped, $options: 'i' } }
    ];
  }

  if (page !== undefined && limit !== undefined) {
    const { page: parsedPage, limit: parsedLimit, skip } = parsePagination({
      page,
      limit,
      defaultLimit: 9,
      maxLimit: 100
    });

    const totalItems = await facilityRepository.count(query);
    const totalPages = Math.ceil(totalItems / parsedLimit);

    const facilities = await facilityRepository
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parsedLimit);

    return { facilities, totalItems, totalPages, page: parsedPage };
  }

  const facilities = await facilityRepository.find(query).sort({ createdAt: -1 });
  return facilities;
};

const createFacility = async ({ data, files }) => {
  const { name, description, location, type, icon } = data;

  const images = files && files.length > 0
    ? await mediaService.uploadImages(files, { folder: 'facilities' })
    : [];

  const facility = await facilityRepository.create({
    name,
    description,
    location,
    type,
    icon,
    images
  });

  return facility;
};

const updateFacility = async ({ facilityId, data, files }) => {
  const { name, description, location, type, icon, keepImages } = data;

  const facility = await facilityRepository.findById(facilityId);
  if (!facility) {
    throw new ServiceError('Facility not found', 404);
  }

  let images = [];
  if (keepImages) {
    try {
      const keepPublicIds = JSON.parse(keepImages);
      images = facility.images.filter((img) => keepPublicIds.includes(img.public_id));
    } catch (error) {
      images = [...facility.images];
    }
  } else {
    images = [...facility.images];
  }

  if (files && files.length > 0) {
    const newImages = await mediaService.uploadImages(files, { folder: 'facilities' });
    images = [...images, ...newImages];
  }

  const removedImages = facility.images.filter(
    (img) => !images.some((newImg) => newImg.public_id === img.public_id)
  );
  for (const img of removedImages) {
    try {
      await mediaService.deleteByPublicId(img.public_id);
    } catch (error) {
      // Ignore delete errors
    }
  }

  facility.name = name;
  facility.description = description;
  facility.location = location;
  facility.type = type;
  facility.icon = icon;
  facility.images = images;

  const updatedFacility = await facility.save();
  return updatedFacility;
};

const deleteFacility = async ({ facilityId }) => {
  const facility = await facilityRepository.findById(facilityId);
  if (!facility) {
    throw new ServiceError('Facility not found', 404);
  }

  for (const img of facility.images) {
    try {
      await mediaService.deleteByPublicId(img.public_id);
    } catch (error) {
      // Ignore delete errors
    }
  }

  await facility.deleteOne();
  return { message: 'Facility deleted' };
};

module.exports = {
  listFacilities,
  createFacility,
  updateFacility,
  deleteFacility
};
