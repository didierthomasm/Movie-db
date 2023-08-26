const express = require('express');
const movies = express.Router();

movies.get('/', async (req, res) => {
  try {
    const connection = await req.pool.getConnection();
    const [results] = await connection.query('SELECT movie_name AS Movie FROM movies');
    connection.release();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = movies;
