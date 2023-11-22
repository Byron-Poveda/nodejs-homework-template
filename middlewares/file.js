const path = require('path')
const multer = require('multer')
const { v4: uuid } = require('uuid')

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../tmp'),
    filename: function (req, file, cb) {
        const uniqueName = `${file.fieldname}-${uuid()}${path.extname(file.originalname)}`;
        return cb(null, uniqueName);
    },
})
const upload = multer({ 
    storage,
    dest: path.join(__dirname, "../tmp"),
    fileFilter: (req, file, cb) => {
        const filetypes = /bmp|gif|jpeg|png|tiff/
        const mimetype = filetypes.test(file.mimetype)
        const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase())
    
        if (mimetype && extname) {
            cb(null, true)
        } else {
            cb(new Error("It must be a valid ext."))
        }
    },
    limits: 5 * 1024 * 1024
})

module.exports = {
    upload
}