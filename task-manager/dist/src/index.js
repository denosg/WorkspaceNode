import './db/mongoose.js';
import dotenv from 'dotenv';
import app from './app.js';
dotenv.config({ path: 'config/dev.env' });
const port = parseInt(process.env.PORT);
app.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
});
// app.use((req, res, next) => {
//     if(req.method === "GET"){
//         res.send('GET request are disables. Please retry later.')
//     }else {
//         next()
//     }
// })
// app.use((req, res, next) => maintenanceMode(req, res, next))
// function maintenanceMode (req, res, next) {
//     res.status(503).send("Site is under maintenance. Please try again later.")
// }
//# sourceMappingURL=index.js.map