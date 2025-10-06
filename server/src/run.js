import express from "express";
import cors from "cors";
import employeeRoutes from "./routes/employeeRoutes.js";
import dotenv from 'dotenv'

dotenv.config();

const app = express();


const corsOptions = ({
  origin: process.env.VITE_CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
})

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/employees", employeeRoutes);


app.get('/', (req, res) => res.send(`Employee data Management platform backend is up and running!!`))

app.listen(4000, () => console.log("Server running on http://localhost:4000"));
