const mongoose = require('mongoose');

const url = process.env.MONGO_URI;
const conn = mongoose.connect(url)
.then(() => console.log('Database connected'))
.catch((err) => console.log(err.message))

module.exports = conn;