const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
};
const getTourDetail = (req, res) => {
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
const addNewTour = (req, res) => {
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

const updateTour = (req, res) => {
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
      tour: requestedTour,
    },
  });
};
const deleteTour = (req, res) => {
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

app.get('/api/v1/tours/:id', getTourDetail);
app.get('/api/v1/tours', getAllTours);
app.post('/api/v1/tours', addNewTour);
app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}....`);
});
