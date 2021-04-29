const next = require('next');

const bodyParser = require('body-parser');
const express = require('express');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.SERVER_PORT || 3000;

const router = require('./server/route');

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    // server.use((req, res, next) => {
    //     res.header(
    //         "access-Control-Allow-Headers",
    //         "x-access-token, Origin, Content-Type, Accept"
    //     );
    //     next()
    // })
    server.use('/api', router);

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

// app.prepare().then(() => {
//     const server = express()
//     server.get('*', (req, res) =>{
//         return handle(req, res)
//     })
//     createServer((req, res) => {
//         const parsedUrl = parse(req.url, true)
//         const { pathname, query } = parsedUrl

//         switch(pathname){
//             case '/a':
//                 app.render(req, res, '/a', query)
//             default:
//                 return handle(req, res)
//         }
//         // if (pathname === '/a') {
//         //     app.render(req, res, '/a', query)
//         //   } else if (pathname === '/b') {
//         //     app.render(req, res, '/b', query)
//         //   } else {
//         //     handle(req, res, parsedUrl)
//         //   }
//     }).listen(3000, (err) =>{
//         if (err) throw err
//         console.log('Server runing on http://localhost:3000')
//     })
// })
