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
    // Testing output from the request object since it contains too much data on its own
    // console.log(request.url, request.method, request.headers);
    var url = request.url;
    if (url === "/message") {
        // Create the header of the response we'll send.
        // Since we're sending an html page as a response, we can set the header
        response.setHeader('Content-Type', 'text/html');
        // Write some data to the response in chunks
        // Eventually, this will be replaced with EJS
        response.write('<html>');
        response.write('<head><title>Enter Message</title></head>');
        response.write('<body><form action="/message" method="POST">');
        response.write('<input type="text"><button type="submit">Send</button></input>');
        response.write('</form></body>');
        response.write('</html>');
        // Exit out of the function if we reach this point
        return response.end();
    }
    response.setHeader('Content-Type', 'text/html');
    // Write some data to the response in chunks
    // Eventually, this will be replaced with EJS
    response.write('<html>');
    response.write('<head><title>My First Page</title></head>');
    response.write('<body><h1>Hello from my Node.js server!</h1></body>');
    response.write('</html>');
    response.end();
    // Once the response is finished, we call the end method to complete it
    // NOTE: Do not change a response after you've ended it
    // Stop the listener from looping
    // process.exit();
};
// Create the server
// Create server creates a listener which never stops by default
var server = http_1.default.createServer(requestListener);
// Listen to all requests
server.listen(3000, "localhost");
