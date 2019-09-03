const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('https');
const cors = require('cors');
const pkey = fs.readFileSync('KEY');
const pcert = fs.readFileSync('CRT');

let options = {
	key: pkey,
	cert: pcert
};

const app = express();
const bodyParser = require('body-parser');

function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}

app.use(requireHTTPS);
app.use(bodyParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());


require('./controllers/router')(app);

app.get('/', (req, res) => {
    res.send('hello world');
  });
  
  // app.set('port', process.env.PORT || 3000);
  
  // app.listen(app.get('port'), () => {
  //   console.log(`✅ PORT: ${app.get('port')} 🌟`);
  // });


http.createServer(app).listen(8080);
https.createServer(options, app).listen(8443);

// httpServer.listen(8080);
// httpsServer.listen(8443);

module.exports = app;
