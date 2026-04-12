const http = require('http');
const app = require('./app');
const port = process.env.port || 3001;

const server = http.createServer(app);

server.listen(port, (req, res) => {
  console.log(`server is running on port http://localhost:${port}`);
})