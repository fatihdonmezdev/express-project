/* eslint-disable import/no-extraneous-dependencies */
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const { default: mongoose } = require('mongoose');
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then((con) => {
  console.log(`DB connected succesfully to:  ${con.connection.name}`);
});

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name.'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price.'],
  },
});
 

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'The Park Camper',
  rating: 4.2,
  price: 335,
});

testTour
  .save()
  .then((doc) => console.log(doc))
  .catch((err) => console.log(`Error occured: ${err}`));
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}....`);
});
