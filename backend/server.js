const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}); // connecting
const connection = mongoose.connection; // get the status of the connection, async fn
// binding the console fn to the current instance,
// binding the console log function and the message to the console.error of the windows
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open',console.log.bind(console, 'MongoDB connection successfully')) // once connection was success

// Routes
const exerciseRoutes = require('./routes/exercises');
const userRoutes = require('./routes/users');

app.use('/exercises',exerciseRoutes);
app.use('/user',userRoutes);

app.listen(port, () => {
  console.log(`sever is listing: ${port}`);
});