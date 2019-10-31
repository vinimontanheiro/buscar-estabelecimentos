var express = require('express');
var app = express();
var path = require('path');
var https = require('https');
var crypto = require('crypto');
var fs = require("fs");
var tls = require('tls');

app.set("port", process.env.PORT || 8005);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/app'));
app.use(express.static(path.join(__dirname, '/')));
app.use(express.Router());


app.get('/', function (req, res, next) {
    res.render("index");
});


/**
 * Listen on provided port, on all network interfaces.
 */

var privateKey = fs.readFileSync('./cert/host.key');
var certificate = fs.readFileSync('./cert/host.cert');
var credentials = {key: privateKey, cert: certificate};

/**
 * Create HTTP server.
 */

const server = https.createServer(credentials,app);

server.listen(app.get("port"), function (err) {
    if (err) {
        console.error(new Error(':-( Server DOWN!!'), err);
    }
    console.info('Listening %d', app.get("port"));
});

module.exports = app;
