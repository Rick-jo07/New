import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import session  from 'express-session'
import { createClient } from 'redis'
import { RedisStore } from 'connect-redis'
import AuthRoute from './router/authRoutes.js'
import morgan from 'morgan';
import router from './router/DataRoutes.js';
import { errorrHandler } from './Middleware/errorHandler.js';

dotenv.config();

const app = express();
let redisClient =createClient({
  url: process.env.REDIS_URL, // Use the connection string from Railway or local .env
});

redisClient.connect().catch(console.error);

// Initialize Store.
let redisStore = new RedisStore({
    client : redisClient, 
    prefix : "myApp:",
})
  
app.use(cors());
app.use(express.json());
app.use(
    session({
      store : redisStore, 
      secret: process.env.secret, // keep this in .env for production
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 1, // 1 hour
      },
    })
  );  
app.use(errorrHandler);
app.use(morgan('dev'));
app.use('/auth', AuthRoute);
app.use('/Data', router);
const port = process.env.PORT



app.listen(port, () => {
    console.log('Server is running on Port', port)
})
