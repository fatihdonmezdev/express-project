const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
});
app.post('/api/v1/tours', (req, res) => {
  console.log(req.body);
  res.status(200).send('Done');
});
const port = 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}....`);
});
