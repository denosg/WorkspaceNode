import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: 'config/dev.env' });
const databaseUrl = process.env.DATABASE_URL;
mongoose.connect(databaseUrl);
//# sourceMappingURL=mongoose.js.map