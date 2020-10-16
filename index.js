var express = require('express');
var app = express();
var mongoose = require('mongoose');

app.use((req, res, next) => {
  if ((req.headers["x-forwarded-proto"] || "").endsWith("http")) 
      res.redirect(`https://${req.headers.host}${req.url}`); 
  else
      next();
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://joao:backmann@mongo_bddesafionode:27017/bddesafionode', { 

 useNewUrlParser: true,
 useUnifiedTopology: true
})
.then(()=>{console.log("Mongobd conectado com sucesso!!");})
.catch((error)=>{console.log("Houve um erro: " + error);
})

var Aluno = mongoose.Schema({
  nome: {
    type: String
  },
  idade: {
    type: String
  }
})
mongoose.model('alunos', Aluno)

app.get('/', (req, res) => {
  res.send('<h1>Hello World!!</h1>')
  res.send('<h1>Hello World!!</h1>')
  
  Aluno.find().then((alunos) => {
    return res.json(alunos)
  }).catch((erro) => {
      return res.status(400).json({
          error: true,
          message: "Nenhum aluno encontrado."
      })
  })
})

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Umbler listening on port %s', port);
});
