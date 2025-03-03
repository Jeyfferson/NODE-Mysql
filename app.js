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
app.engine('handlebars', engine({
    helpers: {
        // Função auxiliar para verificar igualdade
        condicionalIgualdade: function (parametro1, parametro2, options) {
          return parametro1 === parametro2 ? options.fn(this) : options.inverse(this);
        }
      }
    }));
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

//Rota Principal com a situacao
app.get('/:situacao', (req, res) => {
    let sql = 'SELECT * FROM produtos';

    //Executar conexao SQL
    conexao.query(sql, (err, retorno) => {
        res.render('form', {produtos: retorno, situacao: req.params.situacao});
    });

});

//Rota de cadastro
app.post('/cadastrar', (req, res) => {
    try {
        //Obter os dados do cadastro
    let nome = req.body.nome;
    let valor = req.body.valor;
    let imagem = req.files.imagem.name;

    //Validar o nome doproduto e valor
    if( nome === '' || valor === '' || isNaN(valor)){
        res.redirect('/falhaCadastro');
    }else{
        //SQL
        let sql = `INSERT INTO produtos (nome, valor, imagem) VALUES ('${nome}', ${valor}, '${imagem}')`;

        //Execute SQL

        conexao.query(sql, (erro, retorno) => {

            //Caso ocorre algum erro
            if(erro) throw erro;

            //Caso ocorra o cadastro
            req.files.imagem.mv(__dirname+'/imagens/'+req.files.imagem.name);
    
        });

        res.redirect('/okCadastro');
    }

    }catch(e){
        res.redirect('/falhaCadastro');
    }
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

    //Rota para editar produto
    app.post('/editar', (req, res) => {

        //Obter os dados do form
        let nome = req.body.nome;
        let valor = req.body.valor;
        let codigo = req.body.codigo;
        let nomeImagem = req.body.nomeImagem;

        //Validar edicao
        if(nome === '' || valor === '' || isNaN(valor)){
            res.redirect('/falhaEdicao');
        }else{
            //Definir o tipo de edição
        try{
            //Objeto de imagem
            let imagem = req.files.imagem;

            //SQL
            let sql = `UPDATE produtos SET nome = '${nome}', valor = ${valor}, imagem = '${imagem.name}' WHERE codigo = ${codigo}`

            //Execute SQL
            conexao.query(sql, function(err, rows){
                //Erro no cmd SQL
                if(err) throw err;

                //deu ok, remover img antiga
                fs.unlink(__dirname + '/imagens/'+nomeImagem, (err_img) => {
                    console.log('Sucesso ao remover a antiga img');
                });

                //Cadastrar nova img
                imagem.mv(__dirname + '/imagens/'+imagem.name);
            })

        }catch(e){
            //SQL
            let sql = `UPDATE produtos SET nome = '${nome}', valor = ${valor} WHERE codigo = ${codigo}`

            //Execute SQL
            conexao.query(sql, function(erro, rows){
                //ERRO cmd
                if(erro) throw erro;
            })
        }
        

        //Redirecionamento
        res.redirect('/okEditado');
        }
        
    });


});

//Rota de delete de produto
app.get('/remover/:codigo&:imagem', (req, res) => {
    try {
        //SQL DELETE
        let sql = `DELETE FROM produtos WHERE codigo = ${req.params.codigo}`;

        //Execute SQL
        conexao.query(sql, function(erro, retourn) {
            //Caso falhe o cmd SQL
            if(erro) throw erro;

        //Caso o cmd funcione
            fs.unlink(__dirname+'/imagens/'+req.params.imagem, (erro_img) => {
        })
    });

    //Redirecionamento
    res.redirect('/okRemovido')
    }catch(e){
        res.redirect('/falhaRemover');    
    }

});


app.listen(3000);