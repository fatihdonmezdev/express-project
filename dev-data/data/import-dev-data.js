const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config({ path: '../../config.env' });
const { default: mongoose } = require('mongoose');
const Tour = require('./../../models/tourModel');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then((con) => {
  console.log(`DB connected succesfully to:  ${con.connection.name}`);
});
//READ THE JSON
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);
// IMPORT INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('added succesfully.');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
/// DELETE ALL DATA FROM DB

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('deleted succesfully.');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
if (process.argv.includes('--delete')) {
  deleteData();
} else if (process.argv.includes('--import')) {
  importData();
}
console.log(process.argv);
