var through = require('through');
var os = require('os');
var path = require('path');
var File = require('vinyl');

module.exports = function(options){
    var pluginName = 'link-assets';

    options = options || {};
    var baseHref = options.baseHref || '';
    var basePath = options.basePath ? basePath : '';//TODO: better mapping between files and URLs
    var selfCloseSlash = options.selfCloseEmptyElements ? '/' : '';

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
    };

    function bufferContents(file){
        if (file.isNull()) return; // ignore
        if (file.isStream()) return this.emit('error', new Error(pluginName,  'Streaming not supported'));

        //get extension
        var extension = file.path.split('.').pop();

        //build path to asset using baseHref and other mapping rules
        var link = baseHref + basePath;//TODO use path.resolve or whatever it's called and append base filename

        //output tag(s)
        var linkBoilerplate = assetTypeBoilerplateDict[extension.toLowerCase()];
        links.push(linkBoilerplate.beforeURL + link + linkBoilerplate.afterURL);
    }

    function endStream(){
        if (!buffer.length) this.emit('end');

        if(resultFileBuffers.length === 0) this.emit('end');

        this.data(links.join(options.linkBreaks && '\n' || ''));
        this.emit('end');
    }

    return through(bufferContents, endStream);
};