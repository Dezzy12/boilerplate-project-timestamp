// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.use("/public",express.static(__dirname + "/public"));

app.get("/api/:date?", function (req, res) {
  let dateString = req.params.date;
  let present_date;
  if(!dateString){
    present_date = new Date();
  }else{
    if(isNaN(dateString)){
      present_date = new Date(dateString);
    }else{
      present_date = new Date(parseInt(dateString));
    }
  }
  if(present_date.toString() === "Invalid Date"){
    res.json({error: "Invalid Date"});
  }else{
    res.json({unix: present_date.getTime(), utc: present_date.toUTCString()});
  }
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT || 3050, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
