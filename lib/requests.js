// => requests.js

module.exports = function( request, base, defaultFile) {


    //
    // Module Dependencies
    //

    var fs = require('fs'),
        mime = require('./mime.js');

    //
    // Set Variables
    //

    var request_name = request.replace(/\?(.*)/g, ''),
        request_argv = ' get_' + request.replace(/(.*)\?/g, '').split('&').join(' get_'),
        request_argv = request_argv == ' ' + request_name ? '' : request_argv,
        output = {};

    if(request_name != "" && request_name != "/" && fs.existsSync( base + request_name ) ) {

        output.status = 200
        output.mime = mime( request_name );
        output.content = fs.readFileSync( base + request_name );

    } else {

        output.status = 200
        output.mime = mime( "/index.html" );
        output.content = fs.readFileSync( base + "/index.html" );

    }

    return output;
};
