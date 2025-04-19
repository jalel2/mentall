import express from 'express';
import { signin, login, logout } from '../Controllers/AuthController.js';

const authRoute = express.Router();


authRoute.post('/signin', signin);
authRoute.post('/login', login);
authRoute.post('/logout', logout);
export default authRoute;