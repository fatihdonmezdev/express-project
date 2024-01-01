/* eslint-disable node/no-unsupported-features/es-syntax */
const fs = require('fs');
const Tour = require('./../models/tourModel')

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    // results: tours.length,
    // data: { tours },
  });
};
exports.getTourDetail = (req, res) => {
  const paramId = req.params.id * 1;
  // const tour = tours.find((tourname) => tourname.id === Number(paramId));

  res.status(200).json({
    status: 'success',
    // data: { tour },
  });
};


exports.addNewTour = async (req, res) => {
  try{
    const newTour = await Tour.create(req.body)

    res.status(201).send({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  }catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message
    })
  }
 
};

exports.updateTour = (req, res) => {
  const paramId = req.params.id * 1;

  const requestedTour = tours.find((tour) => tour.id === paramId);

  res.status(200).json({
    status: 'success',
    data: {
      requestTime: req.requestTime,
      tour: requestedTour,
    },
  });
};
exports.deleteTour = (req, res) => {
  const paramId = req.params.id * 1;

  const requestedTour = tours.find((tour) => tour.id === paramId);

  res.status(200).json({
    status: 'success',
    data: {
      tour: requestedTour,
    },
  });
};
