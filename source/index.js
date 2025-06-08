import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import session  from 'express-session';
import AuthRoute from './router/authRoutes.js'
import morgan from 'morgan';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(
    session({
      secret: process.env.secret, // keep this in .env for production
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 1, // 1 hour
      },
    })
  );  
  
app.use(morgan('dev'))
app.use('/auth', AuthRoute)
const port = process.env.PORT



app.listen(port, () => {
    console.log('Server is running on Port', port)
})
