const db = require('./db-connection');

function getAllTasks(req, res, next) {
  db.any('SELECT * FROM tasks ORDER BY createdat')
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          data,
          message: 'Retrieved ALL tasks',
        });
    })
    .catch(err => next(err));
}

function getSingleTask(req, res, next) {
  const taskID = parseInt(req.params.id);
  db.one('SELECT * FROM tasks where id = $1 ORDER BY createdat', taskID)
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          data,
          message: 'Retrieved ONE task',
        });
    })
    .catch(err => next(err));
}

function createTask(req, res, next) {
  req.body.priority = parseInt(req.body.priority);
  db.none('INSERT INTO tasks(title, description, duedate, priority, status)' +
      'VALUES(${title}, ${description}, ${duedate}, ${priority}, ${status})',
    req.body)
    .then(() => {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one task',
        });
    })
    .catch(err => next(err));
}

function updateTask(req, res, next) {
  db.none('UPDATE tasks SET title=$1, description=$2, duedate=$3, priority=$4, status=$5 WHERE id=$6',
    [req.body.title, req.body.description, req.body.duedate,
      parseInt(req.body.priority), req.body.status, parseInt(req.params.id)])
    .then(() => {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated task',
        });
    })
    .catch(err => next(err));
}

function deleteTask(req, res, next) {
  const taskID = parseInt(req.params.id);
  db.result('DELETE FROM tasks WHERE id = $1', taskID)
    .then((result) => {
      res.status(200)
        .json({
          status: 'success',
          message: `Deleted ${result.rowCount} task(s)`,
        });
    })
    .catch(err => next(err));
}

function deleteAllTasks(req, res, next) {
  db.result('DELETE FROM tasks')
    .then((result) => {
      res.status(200)
        .json({
          status: 'success',
          message: `Deleted ${result.rowCount} task(s)`,
        });
    })
    .catch(err => next(err));
}

module.exports = {
  getAllTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
};
