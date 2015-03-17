var app = require('express')();
var http = require('http').Server(app); //for socket IO you need an http module
var bodyParser = require('body-parser');
var Promise = require("bluebird");
var httpR = Promise.promisifyAll(require('http-request'));
var unirest = Promise.promisifyAll(require('unirest'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var backBox = function(string){
  return string;
}

http.listen(3000, function(){
  console.log('Listening on localhost:3000')
});

app.get('/', function(req, res){
  res.sendfile('index.html');
});


// ////////////
// // IMAGGA //
// ////////////

// app.post('/api/imgurl', function(req, res){
//   console.log(req.body)

//   httpR.getAsync({
//     headers: header,
//     url: 'http://api.imagga.com/v1/usage'
//   })
//   .catch(function(err){
//     console.log('ERROR: ', err);
//   })
//   .then(function(err, data){
//     console.log(data)
//   })


// });



/////////////
// CAMFIND //
/////////////

// app.post('/api/imgurl', function(req, res){
//   httpR.getAsync({
//     url: 'http://www.tastyburger.com/wp-content/themes/tastyBurger/images/home/img-large-burger.jpg'
//   })
//   .catch(function(err) {
//     console.log('ERROR');
//     console.log(err)
//   })
//   .then(function (image) {
//     // console.log('locale: ', req.body.locale, 'Image: ', req.body.imgurl);
//     // console.log(image.toString('utf8'))
//     return httpR.postAsync({
//       headers: header,
//       url: 'https://camfind.p.mashape.com/image_requests',
//       locale: req.body.locale,
//       image: req.body.imgurl
//       // reqBody: {
//       //   image_request: {
//       //     locale: req.body.locale,
//       //     remote_image_url: image
//       //   }
//       // }
//     });
//   })
//   .catch(function(err, data){
//     console.log('error: ', err, 'DATA: ', data );
//   })
//   // .then(function(err, data){
//   //   //send the location and url to the server and set the data
//   //   // data = response-data
//   //   return httpR.getAsync({
//   //     url: 'https://camfind.p.mashape.com/image_responses/' + data
//   //   })
//   // })
//   // .then(function(err, data){
//   //   console.log(data);
//   // })

// })

app.post('/api/imgurl', function(req, res){
  console.log('DATA FROM CLIENT: ', req.body);

  unirest.post("https://camfind.p.mashape.com/image_requests")
    .header("X-Mashape-Key", "KEY_KEY_KEY")
    .header("Content-Type", "application/x-www-form-urlencoded")
    .header("Accept", "application/json")
    .send("image_request[locale]", "en_US")
    .send("image_request[remote_image_url]", "http://upload.wikimedia.org/wikipedia/en/2/2d/Mashape_logo.png")
    .end(function (result) {
      console.log(result.status, result.headers, result.body);
    });
})