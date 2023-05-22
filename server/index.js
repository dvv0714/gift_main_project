const express = require('express');
const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');
const verifyProof = require('../utils/verifyProof');

const app = express();
app.use(express.json())
const port = 5000;

// Создаем дерево Меркле на основе списка niceList
const merkleTree = new MerkleTree(niceList);

// Получаем корневой хеш дерева
const merkleRoot = merkleTree.getRoot();

app.use(express.json());

app.post('/gift', (req, res) => {
  const { name, proof } = req.body;
  console.log('NAME: ', name);
  console.log('PROOF: ', proof);

  // Проверяем, находится ли имя в списке и проверяем доказательство
  const isInTheList = verifyProof(proof, name, merkleRoot);

  if (isInTheList) {
    res.send('You got a gift!');
  } else {
    res.send('You are not on the list :(');
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
