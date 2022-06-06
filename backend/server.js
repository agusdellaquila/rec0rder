import express from 'express'
import { blobRouter } from './routes/blobs.js'
import path from 'path'
const __dirname = path.resolve()

const app = express()

//MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'build')))

//ROUTES
app.use("/storage/blob", blobRouter)

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(3000, () => console.log("Listening on port 3000"))