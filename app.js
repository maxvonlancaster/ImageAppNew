const path = require("path");
const fs = require("fs");

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

app.get("/delete-all", function(request, response){
  let dir = __dirname + "/images/";
  fs.readdir(dir, (err, files) => {
    files.forEach(element => {
      let imagePath = __dirname + "/images/" + element;
      fs.unlinkSync(imagePath);})
    });
    response.sendFile(__dirname + "/dist/index.html");
})




app.listen(3000);
