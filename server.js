var express = require('express');
var app = express();
var path = require('path');
var http = require('http');

app.set("port", process.env.PORT || 8005);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/app'));
app.use(express.static(path.join(__dirname, '/')));
app.use(express.Router());


app.get('/', function (req, res) {
    res.render("index");
});


/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(app.get("port"), function (err) {
    if (err) {
        console.error(new Error(':-( Server DOWN!!'), err);
    }
    console.info('Listening %d', app.get("port"));
});

module.exports = app;
