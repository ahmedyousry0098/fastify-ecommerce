import { log } from "console";
import { FastifyRequest } from "fastify";
import multer, {diskStorage} from "fastify-multer";
import { File } from "fastify-multer/lib/interfaces";
import { FileFilterCallback } from "multer";

const imageMimeType = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif']

const storage = diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    },  
})
  
const fileFilter = (req: FastifyRequest, file: File, callback: FileFilterCallback) => {
    if (imageMimeType.includes(file.mimetype)) {
        callback(null, true)
    } else {
        callback(null, false)
    }
}

export const upload = multer({ storage, fileFilter })