import express from 'express';
import cors from "cors"
import dotenv from 'dotenv';
import rateLimiter from '../middleware/ratelimiter.js';
import path from "path";


import fashionRoutes from './Routes/fashionRoutes.js';
import { connectDB } from '../config/DB.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve()//by default __dirname is where the source of backend is

if (process.env.NODE_ENV !== "production"){
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );//best to have cors first
}//if app is in development


app.use(express.json());//this middleware is used to parse the incoming request body as JSON. It allows us to access the data sent in the request body using req.body.
app.use(rateLimiter);

app.use('/api/fashion', fashionRoutes);//this middleware is used to define the base route for the fashion-related endpoints. All requests to /api/fashion will be handled by the fashionRoutes router, which contains the route definitions for the fashion-related operations.


if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")));

  app.get("*",(req,res) => {
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
  });
}//only use this in production



connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
})

//mongodb+srv://nairbharath587_db_user:akramafif11@cluster0.pfige8k.mongodb.net/?appName=Cluster0