import express, { json } from 'express';
import './db/mongoose.js';
import userRouter from "./routers/user.js";
import taskRouter from "./routers/task.js";
const app = express();
const port = process.env.PORT || 3000;
app.use((req, res, next) => {
    if (req.method === "GET") {
        res.send('GET request are disables. Please retry later.');
    }
    else {
        next();
    }
});
app.use(json());
app.use([userRouter, taskRouter.router]);
app.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
});
//# sourceMappingURL=index.js.map