//node module
var renderer = require("./renderer.js");
var commonHeaders = {'Content-Type': 'text/html'};


//handle the initial request
function home(request,response) {
    if (request.url === "/") {
        response.writeHead(200,commonHeaders);
        renderer.view(response);
        response.end();    
    } else if (request.url === "/andrew") {
        response.writeHead(200,commonHeaders);
        response.write("HELLO MY NAME IS ANDREW");
        response.end();
    }
}

module.exports.home = home;

//get the data from the header body

