import express from "express";
import User from "../models/user.js";
import auth from "../middleware/auth.js";
import multer from "multer";
import sharp from "sharp";
const router = express.Router();
router.get('/test', (req, res) => {
    res.send('From a new file');
});
router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        const userDoc = await user.save();
        const token = await userDoc.generateAuthToken();
        res.status(201).send({ user, token });
    }
    catch (err) {
        res.status(400).send(err);
    }
});
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    }
    catch (err) {
        res.status(400).send(err);
    }
});
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send();
    }
    catch (err) {
        res.status(500).send(err);
    }
});
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    }
    catch (err) {
        res.status(500).send(err);
    }
});
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
            return cb(new Error('Please upload an Image'));
        }
        cb(undefined, true);
    }
});
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({
        width: 250,
        height: 250
    }).png().toBuffer();
    const avatar = buffer;
    req.user.avatar = avatar;
    await req.user.save();
    res.status(200).send();
}, (err, req, res, next) => {
    res.status(400).send({ err: err.message });
});
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});
// router.get('/users/:id', async (req, res) => {
//     try {
//         const _id = req.params.id;
//         const userDoc = await User.findById(_id);
//         if (!userDoc) {
//             return res.status(404).send();
//         }
//         res.send(userDoc);
//     } catch (err) {
//         res.status(500).send();
//     }
// })
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValid = updates.every((update) => allowedUpdates.includes(update));
    if (!isValid) {
        return res.status(400).send({ error: 'Invalid updates !' });
    }
    try {
        const userDoc = req.user;
        updates.forEach((update) => userDoc[update] = req.body[update]);
        await userDoc.save();
        res.send(userDoc);
    }
    catch (err) {
        console.error(err);
        res.status(400).send(`Err: ${err}`);
    }
});
router.delete('/users/me', auth, async (req, res) => {
    try {
        const _id = req.user._id;
        await req.user.remove();
        res.send(req.user);
    }
    catch (err) {
        res.status(500).send();
    }
});
router.delete('/users/me/avatar', auth, async (req, res) => {
    try {
        const userToken = req.token;
        const user = await User.findOne({ 'tokens.token': userToken });
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        user.avatar = null;
        await user.save();
        res.status(200).send();
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});
router.get('/users/:id/avatar', async (req, res) => {
    try {
        const _id = req.params.id;
        const user = await User.findById(_id);
        if (!user || !user.avatar) {
            throw new Error();
        }
        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    }
    catch (err) {
        res.status(400).send();
    }
});
export default router;
//# sourceMappingURL=user.js.map