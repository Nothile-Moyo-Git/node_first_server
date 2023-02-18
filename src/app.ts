// Import the required module in order to spin up a local http server
import http from "http";

// Create a request listener to handle requests to the described endpoint
// This function now runs for every request
const requestListener = (request : http.IncomingMessage, response : http.ServerResponse) => {
    console.log(request);
};

// Create the server
const server = http.createServer(requestListener);

// Listen to all requests
server.listen(3000, "localhost");