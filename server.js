
const express = require('express');

const { corsMiddleware, jsonBodyParserMiddleware } = require('./middlewares');
const DATA = require('./data');

const PORT = 3001;

const PAGE_SIZE = 100;

const app = express();

app.use([
  corsMiddleware,
  jsonBodyParserMiddleware
]);

const router = express.Router();

router.get('/', (req, res) => {
  console.log(`Received search request. Query: ${JSON.stringify(req.query, null, 2)}`);
  const { search, page = 1 } = req.query;
  if (page < 1) {
    return res.status(400).send("Page must be >= 1.");
  }

  const matchingRows = DATA.filter(row => row.includes(search));

  const beginningOfRange = (page - 1) * PAGE_SIZE;
  const endOfRange = page * PAGE_SIZE;
  const data = matchingRows.slice(beginningOfRange, endOfRange);

  return res.send({
    page,
    totalResults: matchingRows.length,
    totalPages: Math.ceil(matchingRows.length / PAGE_SIZE),
    data
  });
});

// apply routers
app.use(router);

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});