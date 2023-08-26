const express = require('express');
const deleteMovie = express.Router();

deleteMovie.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await req.pool.getConnection();
    await connection.query('DELETE FROM movies WHERE id = ?', [id]);
    connection.release();
    res.json(`Movie with ID ${id} was deleted`);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});


module.exports = deleteMovie;