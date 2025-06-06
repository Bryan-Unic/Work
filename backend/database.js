const mongoose = require('mongoose');

const URI = 'mongodb://localhost/empleados';

mongoose.connect(URI)

.then(db => console.log('Base De Datos Conectada'))

.catch(err => console.error(err));

module.exports = mongoose;