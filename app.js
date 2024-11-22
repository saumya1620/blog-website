const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const blogRoutes = require('./routes/blogs');

const app = express();
const PORT = 3000;

// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// MongoDB Connection
mongoose.connect('mongodb+srv://Saumyajain16:Saumyajain16@cluster0.khpkz.mongodb.net/user?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.use('/blogs', blogRoutes);

// Redirect root to blogs
app.get('/', (req, res) => res.redirect('/blogs'));

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
