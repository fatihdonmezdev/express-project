const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'This is GET request.', app: 'Fatih`s API' });
});
app.post('/', (req, res) => {
  res.status(200).send('You can send POST req to this url.');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}....`);
});
