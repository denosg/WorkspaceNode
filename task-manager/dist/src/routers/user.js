import express from "express";
import User from "../models/user.js";
const router = express.Router();
router.get('/test', (req, res) => {
    res.send('From a new file');
});
router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        const userDoc = await user.save();
        res.status(201).send(user);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
router.get('/users', async (req, res) => {
    try {
        const usersDoc = await User.find();
        res.send(usersDoc);
    }
    catch (err) {
        res.status(500).send();
    }
});
router.get('/users/:id', async (req, res) => {
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
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValid = updates.every((update) => allowedUpdates.includes(update));
    if (!isValid) {
        return res.status(400).send({ error: 'Invalid updates !' });
    }
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
        console.error(err);
        res.status(400).send(`Err: ${err}`);
    }
});
router.delete('/users/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const userDoc = await User.findByIdAndDelete(_id);
        if (!userDoc) {
            return res.status(404).send();
        }
        res.send(userDoc);
    }
    catch (err) {
        res.status(500).send();
    }
});
export default router;
//# sourceMappingURL=user.js.map