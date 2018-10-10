var o = require("ospec");
var http = require("http");

const PORT = 8081;
var server = require("static-app-server").createServer( { port: PORT, path: 'tests/dist' } );

o.spec("responseProgress", function() {
  
  o.after( () => server.close() );
  
  o("get /test.txt must show progress", function( done ) {
    
    var options = { hostname: 'localhost', port: PORT, path: '/test.txt', method: 'GET' };
    
    var req = http.request( options, (res) => {
      o( res.statusCode ).equals( 200 );
      o( res.headers["content-type"] ).equals( "text/plain; charset=UTF-8" );
      
      res.setEncoding('utf8');
      
      res.on('data', (chunk) => {
        o( chunk.includes("lorim ipsum") ).equals( true );
      });
      res.on('end', () => {
        done();
      });
    } );
    
    req.end();
  });

});