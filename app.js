const express = require('express');

//Importar module fileupload
const fileupload = require('express-fileupload');

//Import a express-handlebars
const { engine} = require('express-handlebars');

//Importar FliSystems para apagar elementos img
const fs = require('fs');

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
    
    });

    res.redirect('/');
});

//Rota de delete de produto
app.get('/remover/:codigo&:imagem', (req, res) => {
    //SQL DELETE
    let sql = `DELETE FROM produtos WHERE codigo = ${req.params.codigo}`;

    //Execute SQL
    conexao.query(sql, function(erro, retourn) {
        //Caso falhe o cmd SQL
        if(erro) throw erro;

        //Caso o cmd funcione
        fs.unlink(__dirname+'/imagens/'+req.params.imagem, (erro_img) => {
            console.log('Item removido comsucesso.')
        })
    });

    //Redirecionamento
    res.redirect('/')

});

//Rota para redirecionar para o form de edição
app.get('/formEditar/:codigo', (req, res) => {
    
    //SQL
    let sql = `SELECT * FROM produtos WHERE codigo = ${req.params.codigo}`;

    //Execute SQL
    conexao.query(sql, function(erro, retorno) {
        //Caso tenha erro
        if(erro) throw erro;

        //Tudo ok
        res.render('formEditar', {produto:retorno[0]});
    });


});


app.listen(3000);