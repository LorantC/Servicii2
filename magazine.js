const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const port = process.argv.slice(2)[0];
const app = express();
app.use(bodyParser.json());

const produse = [
   { id: 1, name: 'Procesor' },
   { id: 2, name: 'CD-ROM' },
   { id: 3, name: 'RAM' },
   { id: 4, name: 'HDD'},
   { id: 5, name: 'Sursa' }
];

const magazin = [
   {
       id: 1,
       type: 'Reseller',
       displayName: 'The Rex',
       produse: [1, 4, 3],      
       busy: false
   },
   {
       id: 2,
       type: 'Depozit',
       displayName: 'Peter Pan',
       produse: [2, 5, 1],       
       busy: false
   },
   {
       id: 3,
       type: 'Second Hand',
       displayName: 'Tom',
       produse: [3, 2],       
       busy: false
   },
   {
       id: 4,
       type: 'Scraps',
       displayName: 'Jerry',
       produse: [1, 5],      
       busy: false
   }
];

app.get('/magazin', (req, res) => {
   console.log('Afisare lista magazine');
   res.send(magazin);
});

app.get('/produse', (req, res) => {
   console.log('Afisare lista produse');
   res.send(produse);
});

app.post('/magazin/**', (req, res) => {
   const magazinId = req.params[0];
   const gasitProdus = magazin.find(subject => subject.id == magazinId);

   if (gasitProdus) {
       for (let attribute in gasitProdus) {
           if (req.body[attribute]) {
               gasitProdus[attribute] = req.body[attribute];
               console.log(`Set ${attribute} to ${req.body[attribute]} in Magazin: ${magazinId}`);
           }
       }
       res.status(202).header({Location: `http://localhost:${port}/magazin/${gasitProdus.id}`}).send(gasitProdus);
   } else {
       console.log(`Magazin not found.`);
       res.status(404).send();
   }
});



console.log(`Serviciul "Magazin" asculta ${port}`);
app.listen(port);

