const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
    storage:multer.memoryStorage(),
    fileFilter:(req, file, next)=>{
        const allowed = ['image/jpeg', 'image/jpg', 'image/png'];
        if(allowed.includes(file.mimetype)){
            next(null, true);
        }else{
            next({message: 'Arquivo não suportado'}, false);
        }
    }
};

exports.upload = multer(multer).single('photo');

exports.resize = () => {};