/*
 *
 * Web Server RW
 * Simple HTTP server, with rewrite options
 *
 * Created and developed by Renan Veroneze
 *
 */

module.exports = function(options) {


    //
    // Node.js Dependencies
    // Look at http://nodejs.org/api/globals.html#globals_require
    //

    var http = require('http'),
        path = require('path'),
        fs = require('fs'),
        requests = require('./requests.js');


    //
    // Set Variables
    //

    var pkg = JSON.parse( fs.readFileSync( path.join( path.dirname( __filename ), '../' ) + 'package.json' ) ),
        version = pkg.version,
        base = options.base || 'app',
        port = options.port || 8000,
        defaultFile = options.file || "app/index.html"



    //
    // Process HTTP requests
    //

    var on_request = function( req, res ) {


            if( req.method != 'GET' ) {

                console.log('\x1B[31m✘ ERROR: Method "'+ req.method +'" not supported => ' + req.url + '\x1B[39m');

                return;

            }

            register_request( req, res);


        },

        register_request = function( req, res) {



            var rq = requests( req.url,  base, defaultFile ); // => Call process request

            if( rq.status == 200 ) {

                res.writeHead(200, rq.mime );
                res.write( rq.content );

                console.log('\x1B[32;1m✔ ' + req.method + ' : ' + req.url + '\x1B[39m');

            } else {

                res.writeHead(rq.status);
                res.write('Error!');

                console.log('\x1B[31;1m✘ ERROR: ' + req.url + '\x1B[39m');

            }

            res.end();

        },



        //
        // Start Server
        //

        server = http.createServer( on_request ).listen( port );



        //
        // On exit, close server. ( CTRL + C )
        //

        process.stdin.resume();
        process.on('SIGINT', function() {

            server.close();
            process.exit(1);

        });



        //
        // Welcome Message
        //

        console.log('\x1B[32m _       __     __        _____');
        console.log('| |     / /__  / /_      / ___/___  ______   _____  _____');
        console.log('| | /| / / _ \\/ __ \\     \\__ \\/ _ \\/ ___/ | / / _ \\/ ___/');
        console.log('| |/ |/ /  __/ /_/ /    ___/ /  __/ /   | |/ /  __/ /');
        console.log('|__/|__/\\___/_____/____/____/\\___/_/    |___/\\___/_/');
        console.log('                 /_____/ v.' + version + ' by Ian Davies');
        console.log(' Based on web-server-rewrite by Renan Veroneze\x1B[39m');
        console.log('\n\x1B[34m\x1B[1m=> Listening on http://localhost:' + port + '\x1B[0m' );
        console.log('\n\x1B[31mTo close: CTRL + C\x1B[39m\n');

}