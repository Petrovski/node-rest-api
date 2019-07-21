const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const productRoutes = require('./api/routes/products');
const orderRouters = require('./api/routes/orders');

mongoose.connect(
	'mongodb+srv://Alex:' +
		process.env.MONGO_ATLAS_PW +
		'@node-restful-api-v1jca.mongodb.net/test?retryWrites=true&w=majority',
	{ useNewUrlParser: true }
);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS Setup
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Acess-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
		return res, status(200).json({});
	}
	next();
});

app.use('/products', productRoutes);
app.use('/orders', orderRouters);

app.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.stauts || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;
