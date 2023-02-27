"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the required module in order to spin up a local http server
var http_1 = __importDefault(require("http"));
// Import our routes.ts file so we can process the requests
var routes_1 = __importDefault(require("./routes"));
// Create the server we're running locally with nodemon
// Create server creates a listener which never stops by default
var server = http_1.default.createServer(routes_1.default);
// Listen to all requests
server.listen(3000, "localhost");
