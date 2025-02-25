const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'templates')));

// Define routes for each HTML page
app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname,'templates' ,'initial.hbs'));
});
app.get('/signup.hbs', function (request, response) {
    response.sendFile(path.join(__dirname,'templates' , 'signup.hbs'));
});

app.get('/login', function (request, response) {
    response.sendFile(path.join(__dirname,'templates' , 'login.hbs'));
});

app.get('/theme', function (request, response) {
    response.sendFile(path.join(__dirname,'templates' , 'theme.hbs'));
});
app.get('/home', function (request, response) {
    response.sendFile(path.join(__dirname,'templates' , 'home.hbs'));
});
app.get('/display', function (request, response) {
    response.sendFile(path.join(__dirname,'templates' , 'display.hbs'));
});
app.get('/delete', function (request, response) {
    response.sendFile(path.join(__dirname,'templates' , 'delete.hbs'));
});
app.get('/update', function (request, response) {
    response.sendFile(path.join(__dirname,'templates' , 'update.hbs'));
});
app.get('/logout', function (request, response) {
    response.sendFile(path.join(__dirname,'templates' , 'logout.hbs'));
});



const PORT = 5000;

app.listen(PORT, function () {
    console.log(`Server is running at http://localhost:${PORT}`);
});
