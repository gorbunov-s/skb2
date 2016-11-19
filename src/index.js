import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const baseUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

let pc = {};
fetch(baseUrl)
  .then(async (res) => {
    pc = await res.json();
  })
  .catch(err => {
    console.log('Что-то не так:', err);
  });


function checkHDD(disks) {
  let result = {};

  disks.forEach(disk => {
    result[disk.volume] = result[disk.volume] || 0;
    result[disk.volume] += disk.size;
  });

  for (let key in result) {
    result[key] += 'B';
  }

  return result;
}

function getData(curObj, options) {
  let resObj = Object.assign({}, curObj);

  for (let i = 0; i < options.length; i++) {


    if (resObj[options[i]] === undefined || ( i > 0 && options[i] === 'length')) {
      return undefined
    } else {
      resObj = resObj[options[i]];
    }
  }

  return resObj;
}


app.get('/', async (req, res) => {
  res.json(pc);
});

app.get('*', async (req, res) => {
  const options = _.trim(req.params[0], '/').split('/');
  let result;

  if (options[0] === 'volumes') {
    result = checkHDD(pc.hdd);
  } else {
    result = getData(pc, options);
  }

  if (result === undefined) {
    res.status(404).send('Not Found')
  }

  res.json(result);
});

app.listen(3000, () => {
  console.log('App listens on port 3000!')
});
