import Task from "../models/task.js";
import express from "express";
const router = express.Router();
router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    try {
        const taskDoc = await task.save();
        res.status(201).send(task);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'isDone'];
    const isValid = updates.every((update) => allowedUpdates.includes(update));
    if (!isValid) {
        return res.status(400).send({ error: 'Invalid updates !' });
    }
    try {
        const _id = req.params.id;
        const taskDoc = await Task.findByIdAndUpdate(_id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!taskDoc) {
            return res.status(404).send();
        }
        res.send(taskDoc);
    }
    catch (err) {
        console.error(err);
        res.status(400).send(`Err: ${err}`);
    }
});
router.delete('/tasks/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const taskDoc = await Task.findByIdAndDelete(_id);
        if (!taskDoc) {
            return res.status(404).send();
        }
        res.send(taskDoc);
    }
    catch (err) {
        res.status(500).send();
    }
});
router.get('/tasks/:id', async (req, res) => {
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
router.get('/tasks', async (req, res) => {
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
export default { router };
//# sourceMappingURL=task.js.map