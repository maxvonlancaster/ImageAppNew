const Logger = require("./logger.js");
const logger = new Logger();
const path = require("path");
const os = require("os");
const fs = require("fs");
const EventEmitter = require("events");
const http = require("http");
// const Repository = require("./server/repository");
// const repository = new Repository();
// const TestRepository = require("./server/mongooseRepository");
// const testRepository = new TestRepository();
const multer = require('multer');


const express = require("express");

const app = express();

app.use(express.static(__dirname + "/dist"));
app.use(express.static(__dirname + "/images"));

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'images/');
  },

  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

app.use(function(request, response, next) {
  next();
});
// app.use("/about", function(request, response, next) {
//   console.log("Middleware 2");
//   next();
// });
// app.get("/about", function(request, response) {
//   response.send("<h1>О сайте</h1>");
// });
app.get("/main", function(request, response) {
  response.sendFile(__dirname + "/dist/index.html");
});

app.post("/upload", function(request, response){ 
  let upload = multer({ storage: storage}).single('user_img');

  upload(request, response, function(error) {
    return response.send(error);
  });
});

app.get("/get-images", function(request, response){
  let listFiles = [];

  let dir = __dirname + "/images/";
  fs.readdir(dir, (err, files) => {
    files.forEach(element => {
      listFiles.push(element);
    });

    response.send(listFiles);

  });
})

app.get("/delete", function(request, response){
  console.log("DELETE: ", request.query.imageName);
  let imagePath = __dirname + "/images/" + request.query.imageName + "." + request.query.imageExtension;
  fs.unlinkSync(imagePath);
})



// app.get("/wrongpage", function(request, response) {
//   response.sendStatus(404).send("Resource not found");
//   logger.log("404 accessed");
// });

// // Query string: adress should be: /requeststring?id=1&name=John
// app.get("/requeststring", function(request, response) {
//   let id = request.query.id;
//   let name = request.query.name;
//   response.send(
//     "<h1>YOUR QUERY STRING</h1><p>id = " + id + "</p><p>name = " + name + "</p>"
//   );
// });

// app.get("/contact(.html)?", function(request, response) {
//   response.send("<h1>Contacts</h1>");
// });
// app.get(/.*(\.)html$/, function(request, response) {
//   // regex - route to all ending in htmls
//   response.send();
//   console.log(request.ip);
// });
// app.get("/", function(request, response) {
//   // More general routes go after rarer
//   response.send("<h1>Main page</h1>");
//   logger.log("Accessed ");
// });

// // Redirect to https://docs.microsoft.com/en-us/dotnet/core/tools/cli-msbuild-architecture
// app.use("/redirect", function(request, response) {
//   response.redirect(
//     "https://docs.microsoft.com/en-us/dotnet/core/tools/cli-msbuild-architecture"
//   );
//   logger.log("Redirected ");
// });

app.listen(3000);
