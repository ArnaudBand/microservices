import express, { Request, Response } from 'express';
const app = express();

app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Got it Successfully"
  })
})

app.listen(4000, () => {
  console.log("Api on 4000")
})