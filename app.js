var express        = require('express')
  , methodOverride = require('method-override')
  , logger         = require('morgan')
  , favicon        = require('serve-favicon')
  , Jade           = require('jade')
  , bodyParser     = require('body-parser')
  , http           = require('http')
  , path           = require('path')
  , app            = express();


app.set('port', process.env.PORT || 8001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(path.join(__dirname, 'public/assets/bus.ico')));
app.use(logger('dev'));
app.use(bodyParser());
app.use(methodOverride());

// app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// Pagina de Inicio: http:localhost:PORT
app.get('/', function (req, res){
  res.render( 'index', {
    title : 'RestAPI Backbone with Mongoose and Node/Express'
  });
});

// // API BackBone
// app.get('/api', routes.getApi);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
