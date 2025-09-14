const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const libraryRoutes = require('./routes/library');
const bankRoutes = require('./routes/bank');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Test Projects for Juniors');
});

app.use('/library', libraryRoutes);
app.use('/bank', bankRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});