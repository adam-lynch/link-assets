var through = require('through');
var os = require('os');
var path = require('path');
var File = require('vinyl');

module.exports = function(fileName, options){
    var pluginName = 'link-assets';
    if (!fileName) throw new Error(pluginName,  'Missing fileName parameter for ' + pluginName);


    options = options || {};
    var docRoot = options.docRoot || '';
    var selfCloseSlash = options.selfCloseEmptyElements ? '/' : '';

    var firstFile = null;
    var links = [];
    var assetTypeBoilerplateDict = {
            'css': {
                beforeURL: '<link rel="stylesheet" href="',
                afterURL: '"' + selfCloseSlash + '>'
            },
            'js': {
                beforeURL: '<script src="',
                afterURL: '"></script>'
            }
        },
        queryString = '';

    if(options.bustCache){
        queryString = '?f=' + new Date().getTime();
    }

    function bufferContents(file){
        if (file.isNull()) return; // ignore
        if (file.isStream()) return this.emit('error', new Error(pluginName,  'Streaming not supported'));
        if(!firstFile) firstFile = file;

        //get extension
        var extension = path.extname(file.path).substr(1),
            link = null;

        if(docRoot){
            link = path.relative(docRoot, file.path);
        }
        else {
            link = path.basename(file.path);
        }

        //output tag(s)
        var linkBoilerplate = assetTypeBoilerplateDict[extension.toLowerCase()];
        if(linkBoilerplate){

            link = link.replace(/\\+/g, '/');
            links.push(linkBoilerplate.beforeURL + link + queryString + linkBoilerplate.afterURL);
        }
    }

    function endStream(){
        if (!links.length) this.emit('end');

        var includeFile = new File({
            cwd: firstFile.cwd,
            base: firstFile.base,
            path: path.join(firstFile.base, fileName),
            contents: new Buffer(links.join(options.lineBreaks && '\n' || ''))
        });

        this.emit('data', includeFile);
        this.emit('end');
    }

    return through(bufferContents, endStream);
};
