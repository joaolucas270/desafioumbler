var express = require('express');
var app = express();

app.get('/', (req, res) => {
  res.send('<h1>Hello World!!!</h1>')
})

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Umbler listening on port %s', port);
});
