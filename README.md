# buffer-upload

Express middleware to attach uploaded files to a request object as buffers.

### Implementation

This middleware leverages [multiparty](https://github.com/andrewrk/node-multiparty) to read files in multipart uploads into buffers that are then attached to the request object that is passed into an Express controller. Non-file type parameters in the request body are attached to `request.body`.

### Usage

Requiring this module returns a function that returns a middleware. The function takes two parameters:

* The first parameter is an array identifying the input names of each file to attach. This can be an array if multiple files should be attached, or a string if only one file should be attached.
* The second parameter is an object containing options that are passed into `multiparty.Form()`. Additionally, there is support for `options.extensions`, which can be used to specify an array of accepted file extensions (for example `['jpg', 'png']`).

### Example

```
var fileUpload = require('buffer-upload');
var app = express();

// ...

app.post('/upload', fileUpload(['fileInputName']), function(req, res) {
  // Do something with the req.buffers.fileInputName buffer
  res.end();
});
```
