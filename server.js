const express = require('express');
const mysql = require('mysql2/promise'); // Use promise-based API for connection pooling
const api = require('./routes/index');
require('dotenv').config();

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: dbUsername,
  password: dbPassword,
  database: 'movie_db',
  connectionLimit: 10 // Adjust as needed
});

app.use((req, res, next) => {
  req.pool = pool; // Add the pool to the request object
  next();
});

app.use('/api', api);
console.log(api)
app.get('/', (req, res) => {
  res.json({
    movies: `http://localhost:${PORT}/api/movies`,
    reviews: `http://localhost:${PORT}/api/movie-reviews`,
  });
});

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));
