/* eslint-disable node/no-unsupported-features/es-syntax */
const fs = require('fs');
const Tour = require('./../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};
exports.getAllTours = async (req, res) => {
  try {
    /// SEPERATED THE API FEATURES FROM THE FILE TO AVOID MAKING IT TOO LONG.
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

    //SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours },
    });
  } catch (err) {
    res.status(500).json({ status: 'error', err });
  }
};

exports.getTourDetail = async (req, res) => {
  try {
    /// ID is being sent from the frontend.
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      err,
    });
  }
  // const tour = tours.find((tourname) => tourname.id === Number(paramId));
};

exports.addNewTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).send({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour: updatedTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
  // const paramId = req.params.id * 1;

  // const requestedTour = tours.find((tour) => tour.id === paramId);
};
exports.deleteTour = async (req, res) => {
  try {
    const deletedTour = await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      message: deletedTour,
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err,
    });
  }
};

exports.getTourStats = async (req, res) => {
  try {
    const stats = Tour.aggregate();
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err,
    });
  }
};
