import jwt from "jsonwebtoken";
import User from "../models/user.js";

const auth = async (req, res, next) => {
    try {
        const token: string = req.header('Authorization').replace('Bearer ', '');
        const decoded: any = jwt.verify(token, 'costelasdenissamsungs21');
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.user = user;
        next()
    } catch (err) {
        res.status(401).send({ error: "Please authenticate." })
    }
}

export default auth;