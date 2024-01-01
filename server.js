const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');
const { default: mongoose } = require('mongoose');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then((con) => {
  console.log(`DB connected succesfully to:  ${con.connection.name}`);
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}....`);
});
