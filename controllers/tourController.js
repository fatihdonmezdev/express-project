/* eslint-disable node/no-unsupported-features/es-syntax */
const fs = require('fs');
const Tour = require('./../models/tourModel')

exports.getAllTours = async (req, res) => {
  try{  
    const tours = await Tour.find()
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours },
    });
  }catch(err){
    res.status(500).json({status: 'error',
    err})
  }}

exports.getTourDetail =  async (req, res) => {
  try{
    const tour = await Tour.findById(req.params.id)
    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  }catch(err){
    res.status(500).json({
      status:'error',
      err
    })
  }
  // const tour = tours.find((tourname) => tourname.id === Number(paramId));


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

exports.updateTour = async (req, res) => {
  try{
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body,{
      new: true,
      runValidators: true,
    })
    res.status(200).json({
      status: 'success',
      data: {
        tour: updatedTour,
      },
    });
  }catch(err){
    res.status(400).json({
      status: 'error',
      message: err.message
    })
  }
  // const paramId = req.params.id * 1;

  // const requestedTour = tours.find((tour) => tour.id === paramId);

 
};
exports.deleteTour = async (req, res) => {
  try{
    const deletedTour = await Tour.findByIdAndDelete(req.params.id)
    res.status(200).json({
      status: 'success',
      message: deletedTour
    })
  }catch(err){
    res.status(400).json({
      status: 'error',
      message: err
    })
  }
  // const paramId = req.params.id * 1;

  // const requestedTour = tours.find((tour) => tour.id === paramId);

};
