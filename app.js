// app.js

const express = require('express');
const path = require('path');

const app = express();

// SET VIEW ENGINE
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// STATIC FILES (if needed)
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
const pageRoutes = require('./routes/pageRoutes'); // adjust if your routes are elsewhere
app.use('/', pageRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
