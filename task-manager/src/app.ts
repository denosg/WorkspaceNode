import express, { Router, json } from 'express';
import './db/mongoose.js';
import userRouter from "./routers/user.js";
import taskRouter from "./routers/task.js";
import dotenv from 'dotenv';

dotenv.config({ path: 'config/dev.env' });

const app = express()
console.log(process.env.PORT);

app.use(json())
app.use([userRouter, taskRouter.router])

export default app