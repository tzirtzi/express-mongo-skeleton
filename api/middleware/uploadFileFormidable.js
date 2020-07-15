
const formidable = require('formidable');

const uploadURI = process.env.FILE_UPLOAD_URI || './public/images/';
const allowedFileSizeMB = process.env.FILE_UPLOAD_MAX_SIZE_MB || 12;


module.exports = (req, res, next) => {

    const form = formidable({
        multiples: true, 
        encoding: 'utf-8',
        keepExtensions: true, 
        uploadDir: uploadURI,
        maxFileSize: 1024 * 1024 * allowedFileSizeMB, 
    });

    form.parse(req, (err, fields, files) => {

        if (err) {
            next(err);
            return;
        }
        
        //return uploaded File and fields data in request in the next function
        //req.uploadData = {fields: fields, files: files};
        req.file = files
        req.body = fields;
        
        next();
    });
  }

  /**
 * TO USE in routes 
 * 
 * const upload = require('../middleware/uploadFileFormidable');
 * ...
 * router.post("/", upload, (req, res, next) => {
 *   const product = new Product({
 *     _id: new mongoose.Types.ObjectId(),
 *     name: req.body.name,
 *     price: req.body.price,
 *     productImage: req.uploadData.files.uploadedFiles[0].path 
 *   });
 *   ...
 *   ...
 */