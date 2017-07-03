const express = require('express');
const router = express.Router();

const db = require('../queries');

/* home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Full Stack Challenge Craftworks', owner: 'Philipp Spindler' });
});

router.get('/v1/task', db.getAllTasks);
router.get('/v1/task/:id', db.getSingleTask);
router.post('/v1/task', db.createTask);
router.put('/v1/task/:id', db.updateTask);
router.delete('/v1/task/:id', db.deleteTask);
router.delete('/v1/task', db.deleteAllTasks);


module.exports = router;
