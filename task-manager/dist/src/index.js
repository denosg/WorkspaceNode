import express, { json } from 'express';
import './db/mongoose.js';
import User from './models/user.js';
import Task from './models/task.js';
const app = express();
const port = process.env.PORT || 3000;
app.use(json());
app.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        const userDoc = await user.save();
        res.status(201).send(user);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
app.get('/users', async (req, res) => {
    try {
        const usersDoc = await User.find();
        res.send(usersDoc);
    }
    catch (err) {
        res.status(500).send();
    }
});
app.get('/users/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const userDoc = await User.findById(_id);
        if (!userDoc) {
            return res.status(404).send();
        }
        res.send(userDoc);
    }
    catch (err) {
        res.status(500).send();
    }
});
app.patch('/users/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const userDoc = await User.findByIdAndUpdate(_id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!userDoc) {
            return res.status(404).send();
        }
        res.send(userDoc);
    }
    catch (err) {
        res.status(400).send(`Err: ${err}`);
    }
});
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    try {
        const taskDoc = await task.save();
        res.status(201).send(task);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
app.get('/tasks/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const taskDoc = await Task.findById(_id);
        if (!taskDoc) {
            return res.status(404).send();
        }
        res.send(taskDoc);
    }
    catch (err) {
        res.status(500).send();
    }
});
app.get('/tasks', async (req, res) => {
    try {
        const tasksDoc = await Task.find();
        if (!tasksDoc) {
            return res.status(404).send();
        }
        res.send(tasksDoc);
    }
    catch (err) {
        res.status(500).send();
    }
});
app.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
});
//# sourceMappingURL=index.js.map