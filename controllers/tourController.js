/* eslint-disable node/no-unsupported-features/es-syntax */
const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);

exports.checkID = (req, res, next, val) => {
  if (val * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
};
exports.getTourDetail = (req, res) => {
  const paramId = req.params.id * 1;
  const tour = tours.find((tourname) => tourname.id === Number(paramId));

  res.status(200).json({
    status: 'success',
    data: { tour },
  });
};

exports.addNewTourMiddleware = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    res.status(400).json({ message: 'Name or price cant be empty!' });
  } else {
    next();
  }
};
exports.addNewTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { ...req.body, id: newId };
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).send({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
      if (err) {
        res.status(400).json({
          status: 'error',
          data: {
            err,
          },
        });
      }
    },
  );
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
