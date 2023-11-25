import express, { json } from 'express';
import './db/mongoose.js';
import User from './models/user.js';
import Task from './models/task.js';
const app = express();
const port = process.env.PORT || 3000;
app.use(json());
app.post('/users', (req, res) => {
    const user = new User(req.body);
    user.save().then(() => {
        res.status(201).send(user);
    }).catch((err) => { res.status(400).send(err); });
});
app.get('/users', (req, res) => {
    User.find().then((users) => {
        res.send(users);
    }).catch((err) => {
        res.status(500).send();
    });
});
app.get('/users/:id', (req, res) => {
    const _id = req.params.id;
    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    }).catch((err) => {
        res.status(500).send();
    });
});
app.post('/tasks', (req, res) => {
    const task = new Task(req.body);
    task.save().then(() => {
        res.status(201).send(task);
    }).catch((err) => { res.status(400).send(err); });
});
app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;
    Task.findById(_id).then((task) => {
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    }).catch((err) => {
        res.status(500).send();
    });
});
app.get('/tasks', (req, res) => {
    Task.find().then((tasks) => {
        if (!tasks) {
            return res.status(400).send();
        }
        res.send(tasks);
    }).catch((err) => {
        res.status(500).send();
    });
});
app.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
});
//# sourceMappingURL=index.js.map