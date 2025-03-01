const mysql = require('mysql2');

//Configurar conexão
const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommerce'
})

conexao.connect(function (erro, conn) {
    if(erro) throw erro;
    console.log('connect success');
});

module.exports = conexao;