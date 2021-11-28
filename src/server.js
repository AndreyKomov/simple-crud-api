const http = require("http");
const EventEmitter = require("events");

export class Server {
  constructor() {
    this.emitter = new EventEmitter();
    this.server = this.createServer();
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

  createServer() {
    return http.createServer((req, res) => {
      let body = "";

      req.on("data", (chunk) => (body += chunk));

      req.on("end", () => {
        if (body) {
          req.body = JSON.parse(body);
        }

        this.support.forEach((supp) => supp(req, res));
        const curEmit = this.emitter.emit(
          this._getRouterMask(req.pathname, req.method),
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
