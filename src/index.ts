import express from 'express';
import { auth } from './middleware/auth';
import cors from "cors"
import { authRouter } from './routes/auth';
import { userRouter } from './routes/user';
import { examRouter } from './routes/exam';



const app = express();
app.use(express.json())
app.use(cors())
const port = 3000;

app.use(authRouter)
app.use(userRouter)
app.use(examRouter)


app.get('/', (req, res) => {
  console.log(req)
  res.send("Hello world")
})


app.listen(port, () => {
  console.log("Servidor ta de pé :p")
})