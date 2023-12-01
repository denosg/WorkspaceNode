import express from "express";
import User from "../models/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/test', (req, res) => {
    res.send('From a new file');
});

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        const userDoc = await user.save();
        const token = await userDoc.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken();
        res.send({ user, token })
    } catch (err) {
        res.status(400).send(err)
    }
})

router.get('/users/me', auth, async (req : any, res) => {
    res.send(req.user);
})

router.get('/users/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const userDoc = await User.findById(_id);
        if (!userDoc) {
            return res.status(404).send();
        }
        res.send(userDoc);
    } catch (err) {
        res.status(500).send();
    }
})

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if (!isValid) {
        return res.status(400).send({ error: 'Invalid updates !' });
    }

    try {
        const _id = req.params.id;
        const userDoc = await User.findById(_id)

        updates.forEach((update) => userDoc[update] = req.body[update])

        await userDoc.save();

        if (!userDoc) {
            return res.status(404).send()
        }
        res.send(userDoc);
    } catch (err) {
        console.error(err);
        res.status(400).send(`Err: ${err}`)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const userDoc = await User.findByIdAndDelete(_id);
        if (!userDoc) {
            return res.status(404).send();
        }
        res.send(userDoc);
    } catch (err) {
        res.status(500).send();
    }
})

export default router;