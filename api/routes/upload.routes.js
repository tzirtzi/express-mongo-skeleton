const express = require('express');
const router = express.Router();

const upload = require('../middleware/uploadFileFormidable');


/** Handle uplopad request */
router.post('/', upload, (req, res) => {

  //TO DO: Handle upload data to store file url and info in db!!
  console.log(req.uploadData);

  res.status(200).json(req.uploadData);

});


/** Serving upload form  only for test purposes */
if (process.env.ENVIRONMENT = 'dev') {

  router.get('/form', (req, res) => {
    res.send(`
    <h2>With <code>"express"</code> npm package</h2>
    <form action="/api/upload" enctype="multipart/form-data" method="post">
      <div>Text field title: <input type="text" name="title" /></div>
      <div>File: <input type="file" name="uploadedFiles" multiple="multiple" /></div>
      <input type="submit" value="Upload" />
    </form>
  `);
  });

}

module.exports = router;

