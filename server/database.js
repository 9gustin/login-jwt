var mongoose = require('mongoose');

var db_url = 'mongodb://localhost/login';

mongoose.connect(db_url, { useNewUrlParser: true }, (err, connected)=>{
    if(err){
        console.log('An error occurred when try to connect to database. ', err);
    }
    if(connected){
        console.log('Database is connected');
    }
    else{
        console.log('Database is not connected')
    }
});

module.exports = mongoose;
