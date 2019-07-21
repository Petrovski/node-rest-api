const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
	// _id: mongoose.Schema.Types.ObjectId --- dont need id anymore, it makes it automatically in MongoAtlas
	name: String,
	price: { type: Number, required: true }
});

module.exports = mongoose.model('Product', productSchema);
