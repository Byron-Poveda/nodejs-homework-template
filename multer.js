
const path = require('path')
const multer = require('multer')
const { v4: uuid } = require('uuid')

const storage = multer.diskStorage({
    destination: path.join(__dirname, '/public/avatars'),
    filename: function (req, file, cb) {
      return cb(null, uuid() + path.extname(file.originalname).toLowerCase());
    },
  })

  module.export = storage