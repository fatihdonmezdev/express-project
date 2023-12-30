const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
};
exports.getTourDetail = (req, res) => {
  const paramId = req.params.id;

  if (paramId > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'INVALID ID',
    });
  }
  const tour = tours.find((tour) => tour.id === Number(paramId));

  res.status(200).json({
    status: 'success',
    data: { tour },
  });
};
exports.addNewTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  console.log(newTour);
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
    }
  );
};

exports.updateTour = (req, res) => {
  const paramId = req.params.id;

  if (paramId * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'INVALID ID',
    });
  }
  const requestedTour = tours.find((tour) => tour.id == paramId);

  res.status(200).json({
    status: 'success',
    data: {
      requestTime: req.requestTime,
      tour: requestedTour,
    },
  });
};
exports.deleteTour = (req, res) => {
  const paramId = req.params.id;

  if (paramId * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'INVALID ID',
    });
  }
  const requestedTour = tours.find((tour) => tour.id == paramId);

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Deleted the tour>',
    },
  });
};
