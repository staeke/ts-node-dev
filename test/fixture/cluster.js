const cluster = require('cluster')

function createWorker() {
  const worker = cluster.fork()
  worker.on('message', function (msg) {
    console.log('Message from worker:', msg);
  });
}

if (cluster.isMaster) {
  for (let i = 0; i < 2; i++) {
    console.log('Forking worker', i);
    createWorker();
  }
} else {
  console.log('Worker started.');
  process.send('Hello');
  require('./server');
}
