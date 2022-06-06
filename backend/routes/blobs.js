import { Router } from 'express'
import multer from 'multer'
import { uploadBlob } from '../controllers/blob.js' 

const upload = multer()

const blobRouter = Router()

blobRouter.post('/create', upload.single('blob'), uploadBlob)

export { blobRouter } 