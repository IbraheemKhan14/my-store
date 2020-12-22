const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

//import routes
const authRoutes = require('./routes/api/auth');
const userRoutes = require('./routes/api/user');
const categoryRoutes = require('./routes/api/category');
const productRoutes = require('./routes/api/product');
const braintreeRoutes = require('./routes/api/braintree');
const orderRoutes = require('./routes/api/order');

const app = express();
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connected'));

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//routes middleware
app.use(authRoutes);
app.use(userRoutes);
app.use(categoryRoutes);
app.use(productRoutes);
app.use(braintreeRoutes);
app.use(orderRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
