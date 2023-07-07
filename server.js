// Dependecies
const path = require('path')
const express = require('express');
const sequelize = require('./config/connection');
const session = require('express-session')
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const routes = require('./controllers');


// Set up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Sessions
const sess = {
  secret: 'Super secret secret',
  resave: false,
  saveUninitialized: false,
};

app.use(session(sess));


// Set Handlebars as the default template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

// Start the server to begin listening

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Server listening on: http://localhost:' + PORT))
});