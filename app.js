const express = require('express');

//Import a express-handlebars
const { engine} = require('express-handlebars');

const app = express();

//Adicionando BootStrap
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'));

//Configuration the express-handlebars
app.engine('handlebars', engine());
app.set('view engine','handlebars');
app.set('views', './views');

//Import a db
const conexao = require('./db/mysql');



app.get('/', (req, res) => {
    res.render('form');
})


app.listen(3000);