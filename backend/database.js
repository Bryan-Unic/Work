const mongoose = require('mongoose');

const URI = 'mongodb://localhost:27017/empleados';

mongoose.connect(URI)

.then(db => console.log('La Base De Datos Esta Conectada'))

.catch(err => console.error(err));

module.exports = mongoose;