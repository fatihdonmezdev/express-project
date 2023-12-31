const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

router.param('id', (req, res, next, val) => {
  console.log(`This is the ID req ${val}`);
  next();
});

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.addNewTour);

router
  .route('/:id')
  .get(tourController.getTourDetail)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
