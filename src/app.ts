import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { Pool } from "pg";
import cors from "cors";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

})

const connectToDB = async () => {
  try {
    await pool.connect();
    console.log('Connected to DB')

  } catch (err) {
    console.log('Error connecting to DB', err)
  }
}

connectToDB();

const app = express();

app.use(cors())
app.use(express.json());

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.send("hi");
})

app.listen(process.env.PORT, () => {
  console.log(`server is running at ${process.env.PORT}`)
})
