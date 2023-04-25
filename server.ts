const express = require('express');
const fs = require('fs');
const { join } = require('path');
const { existsSync } = require('fs');

const app = express();
const port = process.env.PORT || 4000;

const distFolder = join(process.cwd(), 'dist/bdispartacuspages/browser');

const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

app.use(express.static(distFolder, {
  maxAge: '1y'
}));

app.get('*', (req, res) => {
  res.sendFile(join(distFolder, indexHtml));
});

const server = require('https').createServer({
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt')
}, app);

server.listen(port, () => {
  console.log(`Angular app running on: https://localhost:${port}`);
});
