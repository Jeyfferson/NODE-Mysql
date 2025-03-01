const express = require('express');
const app = express();
const conexao = require('../db/mysql');




//Rota de cadastro
app.post('/cadastrar', (req, res) => {
    console.log(req.body);
    console.log(req.files.imagem.name);

    req.files.imagem.mv(__dirname+'/imagens/'+req.files.imagem.name);
    res.end();
});
