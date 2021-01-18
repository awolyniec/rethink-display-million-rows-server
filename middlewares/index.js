
const express = require('express');
const cors = require('cors');

module.exports = {
  corsMiddleware: cors({ origin: ['http://localhost:3000'] }),
  jsonBodyParserMiddleware: express.json()
};