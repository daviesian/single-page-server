// => argv.js

exports.flags = function( flags ) {

    var options = {};

    for( n in flags ) {

        var frag = flags[ n ].split('='),
            flag = frag[0].replace(/(--|-)/, ''),
            value = frag[1];

        /* -------------------------- Rules -------------------------- */

        if( flag == 'port' || flag == 'p' ) { options.port = value; } // => Network Port
        if( flag == 'base' || flag == 'b' ) { options.base = value; } // => Root Directory
        if( flag == 'file' || flag == 'f' ) { options.file = value; } // => Default File

    }

    return options;

}





