import express, { json } from 'express';
import './db/mongoose.js';
import userRouter from "./routers/user.js";
import taskRouter from "./routers/task.js";
import dotenv from 'dotenv';
dotenv.config({ path: 'config/dev.env' });
const app = express();
console.log(process.env.PORT);
const port = parseInt(process.env.PORT);
app.use(json());
app.use([userRouter, taskRouter.router]);
app.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
});
// app.use((req, res, next) => {
//     if(req.method === "GET"){
//         res.send('GET request are disables. Please retry later.')
//     }else {
//         next()
//     }
// })
// app.use((req, res, next) => maintenanceMode(req, res, next))
// function maintenanceMode (req, res, next) {
//     res.status(503).send("Site is under maintenance. Please try again later.")
// }
//# sourceMappingURL=index.js.map