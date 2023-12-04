import Task from "../models/task.js";
import express from "express";
import auth from "../middleware/auth.js";
const router = express.Router();
router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id,
    });
    try {
        const taskDoc = await task.save();
        res.status(201).send(task);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'isDone'];
    const isValid = updates.every((update) => allowedUpdates.includes(update));
    if (!isValid) {
        return res.status(400).send({ error: 'Invalid updates !' });
    }
    try {
        const _id = req.params.id;
        const taskDoc = await Task.findOne({ _id, owner: req.user._id });
        updates.forEach((update) => taskDoc[update] = req.body[update]);
        await taskDoc.save();
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
router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id;
        const ownerId = req.user._id;
        const taskDoc = await Task.findOneAndDelete({ _id, owner: ownerId });
        if (!taskDoc) {
            return res.status(404).send();
        }
        res.send(taskDoc);
    }
    catch (err) {
        res.status(500).send();
    }
});
router.get('/tasks/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id;
        const taskDoc = await Task.findOne({
            _id, owner: req.user._id,
        });
        if (!taskDoc) {
            return res.status(404).send();
        }
        res.send(taskDoc);
    }
    catch (err) {
        res.status(500).send();
    }
});
//GET /tasks?completed=true
//GET /tasks?limit=NUMBER&skip=0
//GET /tasks?sortBy=createdAt:asc || createdAt_desc --both methods are good
router.get('/tasks', auth, async (req, res) => {
    const match = {};
    const sort = {};
    if (req.query.isDone) {
        match.isDone = req.query.isDone === 'true';
    }
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }
    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort,
            }
        });
        res.send(req.user.tasks);
    }
    catch (err) {
        res.status(500).send();
    }
});
export default { router };
//# sourceMappingURL=task.js.map