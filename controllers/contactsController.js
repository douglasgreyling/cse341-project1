const Contact = require('../models/contact');
const mongoose = require('mongoose');

const index = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sortBy = 'lastName', order = 'asc' } = req.query;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { [sortBy]: order === 'desc' ? -1 : 1 }
    };

    const skip = (options.page - 1) * options.limit;

    const contacts = await Contact.find()
      .sort(options.sort)
      .skip(skip)
      .limit(options.limit);

    const total = await Contact.countDocuments();

    res.json({
      success: true,
      count: contacts.length,
      total,
      page: options.page,
      totalPages: Math.ceil(total / options.limit),
      data: contacts
    });
  } catch (error) {
    next(error);
  }
};

const show = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid contact ID format'
      });
    }

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    const existingContact = await Contact.findByEmail(email);

    if (existingContact) {
      return res.status(400).json({
        success: false,
        message: 'Contact with this email already exists'
      });
    }

    const contact = new Contact({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday: new Date(birthday)
    });

    const savedContact = await contact.save();

    res.status(201).json({
      success: true,
      message: 'Contact created successfully',
      data: savedContact
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);

      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid contact ID format'
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      id,
      { ...req.body, birthday: req.body.birthday ? new Date(req.body.birthday) : undefined },
      {
        new: true,
        runValidators: true,
        omitUndefined: true
      }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact updated successfully',
      data: contact
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);

      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid contact ID format'
      });
    }

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact deleted successfully',
      data: contact
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { index, show, create, update, destroy };
