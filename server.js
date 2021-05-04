const next = require('next');

const bodyParser = require('body-parser');
const express = require('express');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.SERVER_PORT || 3000;

const verifyToken = require('./server/middleware/verifyToken');
const router = require('./server/route');

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    server.use('/api', verifyToken, router);

    server.all('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      //   console.log(`Server ready on http://localhost:${port}`);
    });
  })
  .catch(excetp => {
    console.error(excetp.stack);
    process.exit(1);
  });
