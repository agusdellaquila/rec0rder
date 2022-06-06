import { Router } from 'express'
import { createContainer, deleteContainer, listContainer } from '../controllers/container.js'

const containerRouter = Router()

containerRouter.post('/create', createContainer)
containerRouter.get('/containers', listContainer)
containerRouter.delete('/delete', deleteContainer)

export { containerRouter }