"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the required module in order to spin up a local http server
var http_1 = __importDefault(require("http"));
var fs_1 = __importDefault(require("fs"));
var querystring_1 = __importDefault(require("querystring"));
// Create a request listener to handle requests to the described endpoint
// This function now runs for every request
var requestListener = function (request, response) {
    // Testing output from the request object since it contains too much data on its own
    // console.log(request.url, request.method, request.headers);
    var url = request.url;
    var method = request.method;
    if (url === "/") {
        // Create the header of the response we'll send.
        // Since we're sending an html page as a response, we can set the header
        response.setHeader('Content-Type', 'text/html');
        // Write some data to the response in chunks
        // Eventually, this will be replaced with EJS
        // The form action property will determine the url your form will submit to and should be defined
        response.write('<html>');
        response.write('<head><title>Enter Message</title></head>');
        response.write('<body><form action="/message" method="POST">');
        response.write('<label for="title">Title</label>');
        response.write('<input type="text" name="title"/></br>');
        response.write('<label for="message">Message</label>');
        response.write('<input type="text" name="message"/></br>');
        response.write('<button type="submit">Send</button>');
        response.write('</form></body>');
        response.write('</html>');
        // Exit out of the function if we reach this point
        return response.end();
    }
    // Check if we're on the other URL and also make sure we're sending a post request
    if (url === "/message" && method === "POST") {
        // Initialise data so we can update it with our chunk buffer
        var data_1 = { title: "", message: "" };
        // Read the data in the stream that we pass through
        request.on('data', function (chunk) {
            // We use queryStream to parse the chunk into an array of prototype objects
            console.log("Request is here");
            data_1 = querystring_1.default.parse(chunk.toString());
            console.log(data_1);
            console.log("\n");
            // Append our two inputs to the file
            // We do this by adding the property from data and then inserting a new line with each entry
            fs_1.default.appendFileSync("message.txt", "".concat(data_1.title, " \r\n"));
            fs_1.default.appendFile("message.txt", "".concat(data_1.message, " \r\n"), function (error) {
                console.log("Error: ".concat(error));
            });
        });
        // When the post ends, get the string out of the buffer with queryString
        request.on('end', function () {
            console.log("Parsing the text has finished");
        });
        // If there's an error, showcase it in the query
        request.on('error', function () {
            console.log("Output error");
            console.log("\n");
        });
        response.statusCode = 302;
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
