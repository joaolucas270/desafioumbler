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

var AlunoSchema = mongoose.Schema({})
mongoose.model('alunos', AlunoSchema)

app.get('/', (req, res) => {
  res.send('<h1>Hello World!!!</h1>')
  AlunoSchema.find().then((alunos) => {
    res.send(alunos)
  }).catch((erro) => {
      res.send("Alunos não encontrados.")
  })
})

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Umbler listening on port %s', port);
});
