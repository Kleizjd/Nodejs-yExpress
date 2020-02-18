var http = require("http");
var url = require("url");
var querystring = require('querystring');
var {info,error} = require('./modules/mylog');
var consts = require('./utils/consts');
var firebase = require('../libs/fireabase');
var {countries} = require('countries-list');
// var fs = require("fs");

var server = http.createServer(function(request, response){

    var parsed = url.parse(request.url);
    console.log(parsed);
    var pathName = parsed.pathname;

   var query =  querystring.parse(parsed.query);
   console.log("query ", query);

    if(pathName === "/"){
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('<html><body><p>HOME PAGE</p></body></html>');
        response.end(); 
    } else if (pathName === "/exit"){
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('<html><body><p>Bye everyone</p></body></html>');
        response.end();
    } else if (pathName === "/country"){
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.write(JSON.stringify(countries[query.code]));
        response.end();
    }else if (pathName === "/info"){
        var result = info(request.url);
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(result);
        response.end();
    } else if (pathName === "/error"){
        var result = error(request.url);
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(result);
        response.end();
    } else {
        response.writeHead(400, {'Content-Type': 'text/html'});
        response.write('<html><body><p>Not Found</p></body></html>');
        response.end();

    }
   
});

server.listen(4000);
console.log("running on 4000")
