# buffer-upload

Express middleware to attach uploaded files to a request object as buffers.

### Usage

```JavaScipt
var fileUpload = require('buffer-upload');
var app = express();

// ...

app.post('/upload', fileUpload(['fileInputName']), function(req, res) {
  // Do something with the req.buffers.fileInputName buffer
  res.end();
});
```
