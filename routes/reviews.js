const express = require('express');
const reviews = express.Router();
// console.error(reviews)
reviews.get('/movie-reviews', async (req, res) => {
  try {
    const connection = await req.pool.getConnection();
    const [results] = await connection.query(`
        SELECT m.movie_name AS Movie, r.review AS Review
        FROM movies m
        LEFT JOIN reviews r ON m.id = r.movie_id
    `);
    connection.release();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});
// console.log(reviews)
module.exports = reviews;
