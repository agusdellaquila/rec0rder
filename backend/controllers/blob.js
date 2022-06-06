import { BlobServiceClient } from "@azure/storage-blob"
import {config } from "dotenv"
import Airtable from "airtable"
var base = new Airtable({apiKey: 'key0YgKxCfMCrEJb7'}).base('app8reXfkJsjntaEV')

config()

const BlobService = BlobServiceClient.fromConnectionString(
    process.env.AZURE_STORAGE_CONNECTION_STRING
)

export const uploadBlob = async (req, res) => {  
    try {
        const container = 'recordings'
        const { originalname, buffer } = req.file

        const containerClient = BlobService.getContainerClient(container)

        
        const blockBlobClient = containerClient.getBlockBlobClient(originalname)

        const data = buffer

        await blockBlobClient.upload(data, data.length)

        base('Rec0rdings').create([
        {
            "fields": {
                "Recording": originalname,
                "URL": blockBlobClient.url
            }
        }
        ], function(err, records) {
        if (err) {
            console.error(err)
            return
        }
        records.forEach(function (record) {
            console.log(record.getId())
        })
        })

        res.json({"message": "done"})
    } catch (error) {
        res.status(500).json({"message": error.message})
    }
}