import "../src/db/mongoose.js";
import User from "../src/models/user.js";
// 6561c9c892b544ce695bc211
User.findByIdAndUpdate("6561c9c892b544ce695bc211", {
    age: 21,
}).then((user) => {
    console.log(user);
    return User.countDocuments({ age: 21 });
}).then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
});
//# sourceMappingURL=promise-chaining.js.map