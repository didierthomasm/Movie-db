const express = require('express');
const updateReview = express.Router();

updateReview.put('/:id', async (req, res) => {
  const { id } = req.params;
  const  { review } = req.body;

  if (review) {
    try {
      const connection = await req.pool.getConnection();
      const [results] = await connection.query(`
      UPDATE reviews SET review = ? WHERE id = ?`,
        [review, id]
      );
      connection.release();
      res.json(`Review with ID ${id} was update`);
    } catch (err) {
      res.status(500).json({ error: 'Database error' });
    }
  } else {
    res.status(400).json({ error: 'Review is required' })
  }
});

module.exports = updateReview;