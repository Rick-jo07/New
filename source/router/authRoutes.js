import express from 'express'
import { Register, Login, Logout } from '../controller/authController.js'

const Authroute = express.Router();


Authroute.post('/register', Register);
Authroute.post('/login', Login);
Authroute.post('/logout', Logout);

export default Authroute