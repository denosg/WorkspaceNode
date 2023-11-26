import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import validator from 'validator';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error(`Password cannot contain "password"`);
            }
        }
    },
    age: {
        default: 0,
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error("Age must be positive number");
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
                throw new Error("Email is invalid");
            }
        }
    }
});
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcryptjs.hash(this.password, 8);
    }
    next();
});
const User = mongoose.model("User", userSchema);
export default User;
//# sourceMappingURL=user.js.map