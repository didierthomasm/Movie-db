const express = require('express');
const addMovie = express.Router();

addMovie.post('/', async (req, res) => {
  const { movie } = req.body;

  if (movie) {
    try {
      const connection = await req.pool.getConnection();
      const [results] = await connection.query(
        'INSERT INTO movies (movie_name) VALUES (?)',
        [movie]
      );
      connection.release();
      res.json(`${movie} was added to the database`);
    } catch (err) {
      res.status(500).json({ error: 'Database error' });
    }
  } else {
    res.status(400).json({ error: 'Movie name is required' });
  }
});

module.exports = addMovie;
