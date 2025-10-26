import 'dotenv/config'; // add at the very top

// quick debug check (remove after):
console.log('DATABASE_URL:', process.env.DATABASE_URL);

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});