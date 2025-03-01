const express = require('express');

//Importar module fileupload
const fileupload = require('express-fileupload');

//Import a express-handlebars
const { engine} = require('express-handlebars');

const app = express();

//Habilitando o Upload de arquivos
app.use(fileupload());

//Adicionando BootStrap
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'));

//Referenciando o CSS
app.use('/css', express.static('./css'));

//Referenciar a pasta imagens
app.use('/imagens', express.static('./imagens'));

//Configuration the express-handlebars
app.engine('handlebars', engine());
app.set('view engine','handlebars');
app.set('views', './views');

//Manipulação de dados via rotas
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Import a db
const conexao = require('./db/mysql');


//Rota principal
app.get('/', (req, res) => {
    let sql = 'SELECT * FROM produtos';

    //Executar conexao SQL
    conexao.query(sql, (err, retorno) => {
        res.render('form', {produtos: retorno});
        console.log(retorno)
    });

});

//Rota de cadastro
app.post('/cadastrar', (req, res) => {
    //Obter os dados do cadastro
    let nome = req.body.nome;
    let valor = req.body.valor;
    let imagem = req.files.imagem.name;

    //SQL
    let sql = `INSERT INTO produtos (nome, valor, imagem) VALUES ('${nome}', ${valor}, '${imagem}')`;

    //Execute SQL
    conexao.query(sql, (erro, retorno) => {
        //Caso ocorre algum erro
        if(erro) throw erro;

        //Caso ocorra o cadastro
        req.files.imagem.mv(__dirname+'/imagens/'+req.files.imagem.name);
        console.log(retorno);
    });

    res.redirect('/');
});




app.listen(3000);