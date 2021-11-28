require('dotenv').config();
const http = require("http");
const port = process.env.PORT || 3000;

const options = {
    // path: '/person',
    path: '/',
    method: 'GET',
}

const req = http.request(options, (res) => {
	let data = ''
	
	res.on('data', (chunk) => {
		data += chunk;
	});
	
	res.on('end', () => {
		console.log('Body:', JSON.parse(data))
	});
	
}).on("error", (err) => {
	console.log("Error: ", err)
}).end();

const server = http
  .createServer((req, res) => {
    apiGet();
/*       switch (req.method) {
          case 'GET':

      }
      console.log(req.url); */

    // res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("respons from service");
  })
  .listen(port);
