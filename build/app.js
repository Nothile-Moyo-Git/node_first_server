"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the required module in order to spin up a local http server
var http_1 = __importDefault(require("http"));
// Create a request listener to handle requests to the described endpoint
// This function now runs for every request
var requestListener = function (request, response) {
    console.log(request);
};
// Create the server
var server = http_1.default.createServer(requestListener);
// Listen to all requests
server.listen(3000, "localhost");
