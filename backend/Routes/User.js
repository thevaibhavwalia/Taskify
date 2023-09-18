import express from 'express'
import { Login } from '../Controllers/User.js'
import {Register} from '../Controllers/User.js'
const UserRoute  = express.Router()
UserRoute.post('/register',Register)
UserRoute.post('/login', Login)

export default UserRoute