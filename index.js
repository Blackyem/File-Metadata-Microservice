var express = require('express');
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const multer = require('multer');
const colors = require("colors");
var cors = require('cors');





var app = express();

dotenv.config();

const upload = multer({
  dest: 'uploads/'
});


app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {

  res.json({
    "name": req.file.originalname,
    "type": req.file.mimetype,
    "size": req.file.size,
    "destination": req.file.destination
  })
});


const PORT = process.env.PORT;

const listener = app.listen(process.env.PORT || 6010, () => {
  console.log(`Your app is listening on port ${PORT}`.bold.blue)
})