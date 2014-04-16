var linkAssets = require('../');
var should = require('should');
var os = require('os');
var fs = require('fs');
var path = require('path');
var File = require('vinyl');
var Buffer = require('buffer').Buffer;
require('mocha');

describe('link-assets', function() {
    describe('linkAssets()', function() {
        var testDirectory = './test';

        it('should link stylesheets while maintaining order', function(done){
            var stream = linkAssets('styles.html');

            var fakeFile1 = new File({
                cwd: "/home/adam/",
                base: "/home/adam/test",
                path: "/home/adam/test/file.css",
                contents: new Buffer("p {color:red}")
            });

            var fakeFile2 = new File({
                cwd: "/home/adam/",
                base: "/home/adam/test",
                path: "/home/adam/test/buttons.css",
                contents: new Buffer(".btn {padding: 8px 12px;}")
            });

            stream.on('data', function(newFile){
                should.exist(newFile);
                should.exist(newFile.path);
                should.exist(newFile.relative);
                should.exist(newFile.contents);

                newFile.relative.should.equal("styles.html");
                newFile.contents.toString('utf8').should.equal('<link rel="stylesheet" href="file.css"><link rel="stylesheet" href="buttons.css">');
                Buffer.isBuffer(newFile.contents).should.equal(true);
                done();
            });

            stream.write(fakeFile1);
            stream.write(fakeFile2);
            stream.end();
        });

        it('should link JavaScripts while maintaining order', function(done){
            var stream = linkAssets('scripts.html');

            var fakeFile1 = new File({
                cwd: "/home/adam/",
                base: "/home/adam/test",
                path: "/home/adam/test/file.js",
                contents: new Buffer("alert(1);")
            });

            var fakeFile2 = new File({
                cwd: "/home/adam/",
                base: "/home/adam/test",
                path: "/home/adam/test/buttons.js",
                contents: new Buffer("var hello = 'World!';")
            });

            stream.on('data', function(newFile){
                should.exist(newFile);
                should.exist(newFile.path);
                should.exist(newFile.relative);
                should.exist(newFile.contents);

                newFile.relative.should.equal("scripts.html");
                newFile.contents.toString('utf8').should.equal('<script src="file.js"></script><script src="buttons.js"></script>');
                Buffer.isBuffer(newFile.contents).should.equal(true);
                done();
            });

            stream.write(fakeFile1);
            stream.write(fakeFile2);
            stream.end();
        });

        it('should self-close empty elements if told', function(done){
            var stream = linkAssets('styles.html', {
                selfCloseEmptyElements: true
            });

            var fakeFile1 = new File({
                cwd: "./home/adam/",
                base: "/home/adam/test",
                path: "/home/adam/test/file.css",
                contents: new Buffer("p {color:red}")
            });

            var fakeFile2 = new File({
                cwd: "/home/adam/",
                base: "/home/adam/test",
                path: "/home/adam/test/buttons.css",
                contents: new Buffer(".btn {padding: 8px 12px;}")
            });

            stream.on('data', function(newFile){
                should.exist(newFile);
                should.exist(newFile.path);
                should.exist(newFile.relative);
                should.exist(newFile.contents);

                newFile.relative.should.equal("styles.html");
                newFile.contents.toString('utf8').should.equal('<link rel="stylesheet" href="file.css"/><link rel="stylesheet" href="buttons.css"/>');
                Buffer.isBuffer(newFile.contents).should.equal(true);
                done();
            });

            stream.write(fakeFile1);
            stream.write(fakeFile2);
            stream.end();
        });

        it('should break asset links onto separate lines if told', function(done){
            var stream = linkAssets('styles.html', {
                lineBreaks: true
            });

            var fakeFile1 = new File({
                cwd: "./home/adam/",
                base: "/home/adam/test",
                path: "/home/adam/test/file.css",
                contents: new Buffer("p {color:red}")
            });

            var fakeFile2 = new File({
                cwd: "/home/adam/",
                base: "/home/adam/test",
                path: "/home/adam/test/buttons.css",
                contents: new Buffer(".btn {padding: 8px 12px;}")
            });

            stream.on('data', function(newFile){
                should.exist(newFile);
                should.exist(newFile.path);
                should.exist(newFile.relative);
                should.exist(newFile.contents);

                newFile.relative.should.equal("styles.html");
                newFile.contents.toString('utf8').should.equal('<link rel="stylesheet" href="file.css">\n<link rel="stylesheet" href="buttons.css">');
                Buffer.isBuffer(newFile.contents).should.equal(true);
                done();
            });

            stream.write(fakeFile1);
            stream.write(fakeFile2);
            stream.end();
        });

        it('should be able to create links relative to document root passed as absolute path', function(done){
            var stream = linkAssets('styles.html', {
                docRoot: '/home/adam'
            });

            var fakeFile1 = new File({
                cwd: "/home/adam/",
                base: "/home/adam/test",
                path: "/home/adam/test/file.css",
                contents: new Buffer("p {color:red}")
            });

            var fakeFile2 = new File({
                cwd: "/home/adam/",
                base: "/home/adam/test",
                path: "/home/adam/test/buttons.css",
                contents: new Buffer(".btn {padding: 8px 12px;}")
            });

            stream.on('data', function(newFile){
                should.exist(newFile);
                should.exist(newFile.path);
                should.exist(newFile.relative);
                should.exist(newFile.contents);

                newFile.relative.should.equal("styles.html");
                newFile.contents.toString('utf8').should.equal('<link rel="stylesheet" href="test/file.css"><link rel="stylesheet" href="test/buttons.css">');
                Buffer.isBuffer(newFile.contents).should.equal(true);
                done();
            });

            stream.write(fakeFile1);
            stream.write(fakeFile2);
            stream.end();
        });

        it('should be able to create links relative to document root passed as relative path', function(done){

            var projectRoot = path.resolve('./'),
                testDirectory = path.join(projectRoot, 'test');

            var stream = linkAssets('styles.html', {
                docRoot: './'
            });

            var fakeFile1 = new File({
                cwd: projectRoot,
                base: testDirectory,
                path: path.join(testDirectory, 'a.css'),
                contents: new Buffer("p {color:red}")
            });

            var fakeFile2 = new File({
                cwd: projectRoot,
                base: testDirectory,
                path: path.join(testDirectory, 'b.css'),
                contents: new Buffer(".btn {padding: 8px 12px;}")
            });

            stream.on('data', function(newFile){
                should.exist(newFile);
                should.exist(newFile.path);
                should.exist(newFile.relative);
                should.exist(newFile.contents);

                newFile.relative.should.equal("styles.html");
                newFile.contents.toString('utf8').should.equal('<link rel="stylesheet" href="test/a.css"><link rel="stylesheet" href="test/b.css">');
                Buffer.isBuffer(newFile.contents).should.equal(true);
                done();
            });

            stream.write(fakeFile1);
            stream.write(fakeFile2);
            stream.end();
        });

        it('should bust cache with current time if told', function(done){

            var projectRoot = path.resolve('./'),
                testDirectory = path.join(projectRoot, 'test');

            var stubbedTime = 12345;
            Date = function(){
                return {
                    getTime: function(){
                        return stubbedTime;
                    }
                }
            };

            var stream = linkAssets('styles.html', {
                bustCache: true
            });

            var fakeFile1 = new File({
                cwd: projectRoot,
                base: testDirectory,
                path: path.join(testDirectory, 'a.css'),
                contents: new Buffer("p {color:red}")
            });

            var fakeFile2 = new File({
                cwd: projectRoot,
                base: testDirectory,
                path: path.join(testDirectory, 'b.css'),
                contents: new Buffer(".btn {padding: 8px 12px;}")
            });

            stream.on('data', function(newFile){
                should.exist(newFile);
                should.exist(newFile.path);
                should.exist(newFile.relative);
                should.exist(newFile.contents);

                newFile.relative.should.equal("styles.html");
                newFile.contents.toString('utf8').should.equal('<link rel="stylesheet" href="a.css?f=' + stubbedTime + '"><link rel="stylesheet" href="b.css?f=' + stubbedTime + '">');
                Buffer.isBuffer(newFile.contents).should.equal(true);
                done();
            });

            stream.write(fakeFile1);
            stream.write(fakeFile2);
            stream.end();
        });
    });
});