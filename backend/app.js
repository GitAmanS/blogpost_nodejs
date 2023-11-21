const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:3000'],
    credentials: true,
  }));
  
app.use(bodyParser.json());

const blogRoutes = require('./routes/blogroutes');
app.use('/blogs', blogRoutes);

const sequelize = require('./config/database');

sequelize.sync({ force: true })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });


app.listen(3000);