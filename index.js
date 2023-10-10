let express = require('express');
let cors = require('cors');
require('dotenv').config()

const multer  = require('multer')
const upload = multer({ dest: './public/files/' })

let app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  let fileUp = req.file;
  let filename = fileUp.originalname;
  let fileType = fileUp.mimetype;
  let fileSize = fileUp.size;
  res.json({
    name: filename,
    type: fileType,
    size: fileSize,
  });
  // {"name":"Screenshot from 2023-10-10 08-43-00.png","type":"image/png","size":32146}
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
