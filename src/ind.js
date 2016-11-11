import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/task2a', (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://account.skill-branch.ru");
  res.header("Access-Control-Allow-Methods", "GET");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  const a = Number(req.query.a) | 0;
  const b = Number(req.query.b) | 0;
  const sum = a + b;

  res.send(sum.toString());
});

app.listen(3000, () => {
  console.log('Your app Listening on port 3000!')
});
