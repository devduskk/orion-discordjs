const client = require('./src/structures/OrionClient');
const config = require('./config.json');

const orion = new client(config);
orion.start();