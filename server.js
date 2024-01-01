const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<password',
  process.env.DATABASE_PASSWORD,
);
const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}....`);
});
