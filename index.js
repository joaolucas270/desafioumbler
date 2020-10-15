var express = require('express');
var app = express();

app.use((req, res, next) => {
  if ((req.headers["x-forwarded-proto"] || "").endsWith("http")) 
      res.redirect(`https://${req.headers.host}${req.url}`); 
  else
      next();
});

app.get('/', (req, res) => {
  res.send('<h1>Hello World!!!</h1>')
})

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Umbler listening on port %s', port);
});
