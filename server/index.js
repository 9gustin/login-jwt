var cors = require('cors');
var morgan = require('morgan');
var express= require('express');

//app 
var app = express();
app.set('port', process.env.PORT || 3000);

//database 
var {mongoose} = require('./database');

//Middlewares 
app.use(cors({origin:'http://localhost:4200'}));
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/user', require('./routes/user.routes'));

//Start app 
app.listen(app.get('port'), ()=>{
    console.log('Server is running in port ', app.get('port'));
})

