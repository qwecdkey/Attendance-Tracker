/**
 * App.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com | ewb0020@auburn.edu
 * @Version - 12 APR 23
 *
 * Run AUttendance frontend
 */

// Modules
const createError = require('http-errors');
const express = require('express');
const path = require('path');
// Functions
// Configuration
// const config = require('./config');

// Create app
let app = express();

// Get build directories
const public = path.normalize(path.join(__dirname, './public'));
const homescreen = path.normalize(path.join(__dirname, '../packages/homescreen', 'build'));
const quiz_creation = path.normalize(path.join(__dirname, '../packages/quiz-creator', 'build'));
const presentation = path.normalize(path.join(__dirname, '../packages/presentation', 'build'));
const response = path.normalize(path.join(__dirname, '../packages/response', 'build'));

// Configure build directories
// // app.use(express.static(public));
app.use(express.static(homescreen));
app.use(express.static(quiz_creation));
app.use(express.static(presentation));
app.use(express.static(response));


app.get('/', (req, res) => {
    res.sendFile(path.join(homescreen, 'index.html'));
});


app.get('/create/*', (req, res) => {
    res.sendFile(path.join(quiz_creation, 'index.html'));
});

app.get('/presentation/*', (req, res) => {
    res.sendFile(path.join(presentation, 'index.html'));
});

app.get('/response', (req, res) => {
    res.sendFile(path.join(response, 'index.html'));
});

app.listen(80, () => {
    console.log("Listening on port 80");
})

