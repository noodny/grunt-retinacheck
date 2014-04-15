/*
 * grunt-retinacheck
 * https://github.com/noodny/grunt-retinacheck
 *
 * Copyright (c) 2014 noodny
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('retinacheck', 'Compare retina images presence and sizes to normal images by directory.', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
                normalDir: 'sprite-normal',
                retinaDir: 'sprite-retina'
            }),
            normalDir = options.normalDir,
            retinaDir = options.retinaDir,
            imageSize = require('image-size');

        grunt.log.writeln('Checking sprites in directory ' + normalDir);

        grunt.file.recurse(normalDir, function(abspath, rootdir, subdir, filename) {
            var normalImage = abspath,
                retinaImage = retinaDir + '/' + filename,
                normalSize, retinaSize;

            if(!grunt.file.exists(retinaImage)) {
                grunt.log.error('Retina file ' + filename + ' is missing!');
            } else {
                normalSize = imageSize(normalImage);
                retinaSize = imageSize(retinaImage);

                if(normalSize.width * 2 !== retinaSize.width || normalSize.height * 2 !== retinaSize.height) {
                    grunt.log.error('Retina file ' + filename +
                        ' has the size of ' + retinaSize.width + 'x' + retinaSize.height +
                        ' instead of ' + normalSize.width * 2 + 'x' + normalSize.height * 2);
                }
            }
        });
    });

};
