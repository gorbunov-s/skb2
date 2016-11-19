import express from 'express';
import cors from 'cors';

const app = express();


function handleFullName(fullname) {
    return fullname.replace(/\s\s+/g, ' ').split(' ')
}

function handleFirstName(namePart) {
    return `${ namePart.charAt(0).toUpperCase() }${ namePart.slice(1).toLowerCase() }`
}

function handleOther(namePart) {
    return `${ namePart.charAt(0).toUpperCase() }.`
}

function tests(queryFullname, fullnameArray) {
    if (!queryFullname || fullnameArray.length > 3) {
        return true;
    }

    for (let namePart = 0; namePart < fullnameArray.length; namePart++) {
        if (!!~fullnameArray[namePart].search(/\d|[_/]/g)) {
            return true;
        }
    }

    return false;
}


app.use(cors());

app.get('/task2B', (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://account.skill-branch.ru");
  res.header("Access-Control-Allow-Methods", "GET");
  res.header("Access-Control-Allow-Headers", "Content-Type");
    const fullnameArray = handleFullName(req.query.fullname);

    if (tests(req.query.fullname, fullnameArray)) {
        res.send('Invalid fullname');
    } else {
        let refultFullname = handleFirstName(fullnameArray[fullnameArray.length - 1]);

        fullnameArray.slice(0, -1).forEach((partName) => {
            refultFullname += ` ${ handleOther(partName) }`;
        });

        res.send(refultFullname);
    }
});

app.listen(3000, () => {
    console.log('Your app Listening on port 3000!');
});
