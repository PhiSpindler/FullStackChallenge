const db = require('../db-connection');
const fetch = require('node-fetch');

let interval;

function schedulerFunction() {
  fetch('http://api.icndb.com/jokes/random')
  .then(res => res.json()).then((json) => {
    const joke = json.value.joke;
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + (365 * 24 * 60 * 60 * 1000));
    const dueDate = new Date(startDate.getTime() + (Math.random() * (endDate.getTime() - startDate.getTime())));
    const priority = Math.floor((Math.random() * 3) + 0);

    // Insert new Task
    db.one('INSERT INTO tasks(title, description, duedate, priority, status)' +
            'VALUES($1, $2, $3, $4, $5) RETURNING id',
            [joke, 'This awesome Joke is provided by icndb.com', dueDate, priority, true])
    .then((data) => {
      console.log(`Scheduler added new Task [ID: ${data.id}]`);
    });
  });
}

function runScheduler() {
  interval = setInterval(() => { schedulerFunction(); }, 1000 * 15);
}

function stopScheduler() {
  clearInterval(interval);
}

module.exports = {
  run: runScheduler,
  stop: stopScheduler,
};
