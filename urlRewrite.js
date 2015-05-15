"use strict";

var vsm = require('lrs/virtualServerModule');
var http = require('http');
var url = require('url');
var hostname = 'www.example.com'
var 301_MOVED_PERMANENTLY = 301;

function requestHandler(servReq, servResp, cliReq){
  servReq.on('response', responseHandler(cliResp){
    cliResp.bindHeaders(servResp);
    if (servResp.statusCode === 301_MOVED_PERMANENTLY){
      var location = servResp.getHeader('Location');
      servResp.removeHeader('Location');
      servResp.setHeader('Location', hostname+location);
    }
    
    cliResp.pipe(servResp);
  });
  
  var reqUrlparsed = url.parse(servReq.url);
  servReq.removeHeader('Host');
  servReq.addHeader('Host', reqUrlParsed.pathname);
  cliReq();
}

vsm.on('exist', 'appsContentServer', function(vs){
  vs.on('request', requestHandler);
});
