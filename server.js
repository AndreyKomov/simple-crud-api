require('dotenv').config();
const http = require("http");
const port = process.env.port || 3000;


const server = http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("respons from service");
  })
  .listen(port, () => {
    console.log("server is running");
  });
