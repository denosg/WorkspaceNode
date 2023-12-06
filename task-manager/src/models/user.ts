import { Document, Model, model, Schema } from 'mongoose';
import bcryptjs from 'bcryptjs';
import validator from 'validator';
import jwt from "jsonwebtoken";

const jwtSecret = 'costelasdenissamsungs21';

interface IUser extends Document {
    name: string;
    password: string;
    age: number;
    email: string;
    tokens: [{}],
    avatar: Buffer,
    generateAuthToken: () => Promise<string>;
    getPublicProfile: () => any;
}

interface IUserModel extends Model<IUser> {
    findByCredentials(email: string, password: string): Promise<IUser>;
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error(`Password cannot contain "password"`)
            }
        }
    },
    age: {
        default: 0,
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error("Age must be positive number")
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.default.isEmail(value)) {
                throw new Error("Email is invalid")
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }],
    avatar: {
        type: Buffer,
    }
}, { timestamps: true, });

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function (): any {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

userSchema.methods.generateAuthToken = async function (): Promise<string> {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'costelasdenissamsungs21')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async function (
    email: string,
    password: string
): Promise<IUser> {
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('Unable to login.');
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Unable to login.');
    }

    return user;
};

//Hash plain text pass before saving
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcryptjs.hash(this.password, 8)
    }
    next()
})

const User = model<IUser, IUserModel>('User', userSchema);

export default User;
