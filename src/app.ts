// Import the required module in order to spin up a local http server
import http from "http";
import fs from "fs";
import qs from "querystring";

// Create a request listener to handle requests to the described endpoint
// This function now runs for every request
const requestListener = (request : http.IncomingMessage, response : http.ServerResponse) => {

    // Testing output from the request object since it contains too much data on its own
    // console.log(request.url, request.method, request.headers);
    // console.log(request.headers);

    const url = request.url;
    const method = request.method;


    if ( url === "/" ) {

        // Create the header of the response we'll send.
        // Since we're sending an html page as a response, we can set the header
        response.setHeader('Content-Type', 'text/html');

        // Write some data to the response in chunks
        // Eventually, this will be replaced with EJS
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

        // Redirect after the form is submitted

        // Exit out of the function if we reach this point
        return response.end();

    }

    // Check if we're on the other URL and also make sure we're sending a post request
    if ( url === "/message"  && method === "POST" ) {

        // Read the data in the stream that we pass through
        request.on('data', (chunk : Buffer) => {

            console.log("Request is here");
            console.log( qs.parse(chunk.toString()) );
            console.log("\n\n");
        });

        // When the post ends, get the string out of the buffer with queryString
        request.on('end', () => {
            console.log("Parsing the text has finished");
        });

        // If there's an error
        request.on('error', () => {
            console.log("Output error");
            console.log("\n\n");
        });

        fs.writeFileSync('message.txt', "DUMMY");
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
const server = http.createServer(requestListener);

// Listen to all requests
server.listen(3000, "localhost");