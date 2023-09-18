import express from 'express'

import { CreateTask, DeleteTask, getTask, getTasks, UpdateTask } from '../Controllers/Task.js'
import { verifyJwtToken } from '../Middleware/VerifyToken.js'
const TaskRoute= express.Router()

TaskRoute.post('/create',verifyJwtToken,  CreateTask)
TaskRoute.put('/:id' ,verifyJwtToken, UpdateTask)
TaskRoute.get('/:id' ,verifyJwtToken, getTask)
TaskRoute.get('/' ,verifyJwtToken, getTasks)
TaskRoute.delete('/:id',DeleteTask)

export default TaskRoute