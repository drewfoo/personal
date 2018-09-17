//node modules
var fs = require("fs");

//create a function that will get the right file view when called
function view(response) {
    var fileContents = fs.readFileSync('./views/header.html', {encoding : "utf-8"})
    response.write(fileContents);
}

module.exports.view = view;

//export this file so that the router file can access the view documents