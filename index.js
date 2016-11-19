import express from 'express';
import cors from 'cors';

function canonize(username) {
  const ure = new RegExp('@?(https?:)?(\/\/)?(www.?)?(([a-zA-Z0-9-.]*)[^\/]*\/)?([@]*)?([a-zA-Z0-9._]*)', 'i');
  const nickname = username.match(ure)[7];

  if (!nickname.length) {
    return 'Invalid username'
  }

  return '@' + nickname;
}

const app = express();

app.use(cors());

app.get('/task2c', (req, res) => {
  const nickname = canonize(req.query.username);

  res.send(nickname);
});

app.listen(3000, () => {
  console.log('Example app listening');
});
