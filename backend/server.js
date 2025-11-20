import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import 'dotenv/config.js';

// app config
const app = express();
const port = 4000;

// middlewares
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use('/images', express.static('uploads'));
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);

app.get("/", (req, res) => {
    res.status(200).send("Api working");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

//mongodb+srv://sagarkoju:mongodb007@cluster0.kxwxita.mongodb.net/?appName=Cluster0