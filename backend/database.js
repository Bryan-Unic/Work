const mongoose = require('mongoose');

const URI = 'mongodb://localhost/empleados';

mongoose.connect(URI)

.then(db => console.log('La Base De Datos Esta Conectada'))

.catch(err => console.error(err));

module.exports = mongoose;