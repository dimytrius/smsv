var express = require('express')
    , load = require('express-load')
    , bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    , expressSession = require('express-session')
    , methodOverride = require('method-override')
    , app = express()
    , http = require('http').Server(app)
    , io = require('socket.io')(http)
    , mySocket
    , serialport = require('serialport')
    , mongoose = require('mongoose')
    , mySerial = new serialport("/dev/ttyUSB0", {
      baudrate: 9600,
        parser: serialport.parsers.readline("\n")

      })
    ;
mongoose.Promise = global.Promise;

global.db = mongoose.connect('mongodb://localhost:27017/SMSV');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookieParser('SMSV'));
app.use(expressSession());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));

mySerial.on("open", function(){
  console.log("Porta aberta.");
});

mySerial.on("data", function(dado){
  //console.log(dado);
  io.emit("dadoArduino", {
    valor: dado
      });
});

io.on("connction", function(socket){
  console.log("um usuario esta conectado!");
});


load('models')
  .then('controllers')
  .then('routes')
  .into(app)

;


http.listen(3000, function(){
  console.log("SMSV no ar.");
});
