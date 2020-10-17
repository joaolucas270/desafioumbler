var express = require('express');
var app = express();       

app.use((req, res, next) => {
  if ((req.headers["x-forwarded-proto"] || "").endsWith("http")) 
      res.redirect(`https://${req.headers.host}${req.url}`); 
  else
      next();
});

app.get("/", (req, res) => {
    var data = new Date();
    var hora = data.getHours().toString().length < 2 ? "0" + data.getHours() : data.getHours();
    var min = data.getMinutes().toString().length < 2 ? "0" + data.getMinutes() : data.getMinutes();
    var str_hora = hora + ':' + min;
    res.send("<h1>Hello World!!&ensp;" + str_hora + "</h1>");
})

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Umbler listening on port %s', port);
});