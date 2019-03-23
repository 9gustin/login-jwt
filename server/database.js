var mongoose = require('mongoose');

var db_url = 'mongodb://localhost/login';

mongoose.connect(db_url, { useNewUrlParser: true }, (err, connected)=>{
    if(err){
        console.log('Ocurrio un error intentando conectarse a la base de datos. Codigo de error: ', err);
    }
    if(connected){
        console.log('Conexion con la base de datos exitosa');
    }
    else{
        console.log('No se establecio una conexion con la base de datos')
    }
});

module.exports = mongoose;
