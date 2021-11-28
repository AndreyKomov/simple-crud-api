const http = require("http");
const EventEmitter = require("events");

class Server {
  constructor() {
    this.emitter = new EventEmitter();
    this.server = this.createNewServer();
    this.support = [];
  }

  callSupport(supp) {
    this.support.push(supp);
  }

  addRouter(router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path];
      Object.keys(endpoint).forEach((method) => {
        const handler = endpoint[method];
        this.emitter.on(this.getMaskforRouter(path, method), (req, res) => {
          handler(req, res);
        });
      });
    });
  }

  getMaskforRouter(path, method) {
    return `[${path}]:[${method}]`;
  }

  createNewServer() {
    return http.createServer((req, res) => {
      let body = "";

      req.on("data", (chunk) => (body += chunk));

      req.on("end", () => {
        if (body) {
          req.body = JSON.parse(body);
        }

        this.support.forEach((supp) => supp(req, res));
        const curEmit = this.emitter.emit(
          this.getMaskforRouter(req.pathname, req.method),
          req,
          res
        );

        if (!curEmit) {
          res.end();
        }
      });
    });
  }

  listen(port, callback) {
    this.server.listen(port, callback);
  }
}

module.exports = Server;
