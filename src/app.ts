// Import the required module in order to spin up a local http server
import http from "http";

// Import our routes.ts file so we can process the requests
import requestHandler from "./routes";

// Interface for the data so we know what properties from the form to expect
interface Data {
    title : string,
    message : string
}

// Create the server we're running locally with nodemon
// Create server creates a listener which never stops by default
const server = http.createServer(requestHandler);

// Listen to all requests
server.listen(3000, "localhost");