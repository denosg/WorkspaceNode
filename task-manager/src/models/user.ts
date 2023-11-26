import { Document, Model, model, Schema } from 'mongoose';
import bcryptjs from 'bcryptjs';
import validator from 'validator';

interface UserInterface extends Document {
    name: string;
    password: string;
    age: number;
    email: string;
}

interface UserModelInterface extends Model<UserInterface> {
    findByCredentials(email: string, password: string): Promise<UserInterface>;
}

const userSchema = new Schema<UserInterface>({
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
    }
});

userSchema.statics.findByCredentials = async function (
    email: string,
    password: string
): Promise<UserInterface> {
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

const User = model<UserInterface, UserModelInterface>('User', userSchema);

export default User;
