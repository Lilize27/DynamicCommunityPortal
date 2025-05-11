// app.js

const express = require('express');
const path = require('path');
const bodyParser=require('body-parser')
const app = express();

const pageRoutes = require('./routes/pageRoutes');
const logRoutes = require('./routes/logRoutes');
const eventsRoutes = require('./routes/eventsRoutes');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', pageRoutes);
app.use('/', logRoutes);
app.use('/api/events',eventsRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});