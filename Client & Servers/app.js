// HANDLING BROWNSER REQUESTS & RESPONSES USING NODE.JS & EXPRESS

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

// create an express app 
const app = express();

// connect to mongoDB 
const username = 'theharriscode401'
const password = '14Mar3014Oct3?!'
const encodedPassword = encodeURIComponent(password);

const dbURI = `mongodb+srv://${username}:${encodedPassword}@cluster0.swgfzzo.mongodb.net/cluster0?retryWrites=true&w=majority`
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');


//middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));

// responding to requests

// sending index.html to browswer
app.get('/', (req,res) => {
    const blogs = [
        // {title: "Jayson Tatum scores 45 points", snippet: "random text random text random text random text "},
        // {title: "Jaylen brown dishes out 8 assists", snippet: "random text random text random text random text "},
        // {title: "Kristaps Porzingis grabs 14 rebounds", snippet: "random text random text random text random text "}
    ]
    // res.sendFile('./views/index.html', {root: __dirname}); sending a file to the browser
    res.render('index', {title: 'Home', blogs}); // render() will automatically look inside of 'views' folder
});

// sending about.html to browser
app.get('/about', (req, res) => {
    // res.sendFile('./views/about.html', { root: __dirname});
    res.render('about', {title: 'About'});
});

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create a new Blog'});
})
// redirecting about-us to about page
// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// });

// default response if none of the requested pages are valid | 404 error & setting the status code
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});