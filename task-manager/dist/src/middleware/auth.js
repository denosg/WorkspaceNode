import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from 'dotenv';
dotenv.config({ path: 'config/dev.env' });
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        if (!user) {
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    }
    catch (err) {
        res.status(401).send({ error: "Please authenticate." });
    }
};
export default auth;
//# sourceMappingURL=auth.js.map