// Import the required module in order to spin up a local http server
import http from "http";
import fs from "fs";
import qs from "querystring";

// Interface for the data so we know what properties from the form to expect
interface Data {
    title : string,
    message : string
}

// Create a request listener to handle requests to the described endpoint
// This function now runs for every request
const requestListener = (request : http.IncomingMessage, response : http.ServerResponse) => {

    // Testing output from the request object since it contains too much data on its own
    // console.log(request.url, request.method, request.headers);
    const url = request.url;
    const method = request.method;


    if ( url === "/" ) {

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
    if ( url === "/message"  && method === "POST" ) {

        // Initialise data so we can update it with our chunk buffer
        let data : Data | any = {title : "", message : ""};

        // Read the data in the stream that we pass through
        // Runs each time a chunk is ready to be parsed
        request.on('data', (chunk : Buffer) => {

            // We use queryStream to parse the chunk into an array of prototype objects
            data = qs.parse(chunk.toString());

        });

        // When the post ends, get the string out of the buffer with queryString
        request.on('end', () => {

            // Append our two inputs to the file
            // We do this by adding the property from data and then inserting a new line with each entry
            fs.appendFileSync("message.txt", `${data.title} \r\n`);

            fs.appendFileSync("message.txt", `${data.message} \r\n`);

        });

        // If there's an error, showcase it in the query
        request.on('error', () => {
            console.log("Output error");
            console.log("\n");
        });

        response.statusCode = 302;
        response.setHeader("Location", "/");
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