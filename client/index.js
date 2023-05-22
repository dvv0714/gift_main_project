const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:5000';

async function main(name) {
  const merkleTree = new MerkleTree(niceList);

  const index = niceList.findIndex((item) => item === name);

  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name: name,
    proof: proof
  });

  console.log({ gift, name });
}

main('Paul Ward');
