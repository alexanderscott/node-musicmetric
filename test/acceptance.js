"use strict";

var assert = require('assert'),
    _und = require('underscore'),
    util = require('util'),
    readline = require('readline'),
    http = require('http');

var testApiKey = '49d037b9054445238a56c15d6b95ad68';
var testArtistKey = '';
var musicMetric = require('../lib/musicmetric')(testApiKey);
var testArtistId = 'e5f7be85c9b94d70b5d3dc13ee997c56';
var testArtistName = 'The White Stripes';
var rl;
var timeout = 30000;

describe('Musicmetric', function(){

    function promptForKey(cb){
        rl = rl || readline.createInterface({ input: process.stdin, output: process.stdout });
        rl.question("Please enter a valid MusicMetric API key to test with: ", function(inputKey){
            if(!_und.isString(inputKey)) promptForKey(cb);
            else {
                cb(null, inputKey);
            }
        });
    }

    before(function(cb){
        this.timeout(timeout);
        if( _und.isString(testApiKey) ) cb(null);
        else {
            promptForKey(function(err, inputKey){
                testApiKey = inputKey;
                cb(null);
            });
        }
    });

    describe('#new()', function(){
        it('can create a new Musicmetric instance with correct basic init options', function(cb){
            this.timeout(timeout);
            try {
                musicMetric = require('../lib/musicmetric')(testApiKey);
                cb();
            }
            catch(err){
                cb(err);
            }
        });

        it('can create a new Musicmetric instance with correct advanced init options', function(cb){
            this.timeout(timeout);
            try {
                musicMetric = require('../lib/musicmetric')({ apiKey: testApiKey, format: 'json', userAgent: 'test' });
                cb();
            }
            catch(err){
                cb(err);
            }
        });

        it('cannot create a new Musicmetric instance without an API key', function(cb){
            this.timeout(timeout);
            try {
                musicMetric = require('../lib/musicmetric')();
                cb("Error: could instantiate musicmetric api without api key.");
            }
            catch(err){
                cb();
            }

        });

    });

    describe('#getTotalPlays()', function(){
        it('can get artist total plays given a correct artist UUID', function(cb){
            this.timeout(timeout);
            musicMetric.getTotalPlays({ artistId: testArtistId }, function(err, res){
                if(err){
                    console.log(err);
                    assert.ifError(err);
                    return cb(err);
                }
                assert.ok( _und.isObject(res), 'response is an object');
                cb();
            });
        });
        it('can get artist total plays given an artist name', function(cb){
            this.timeout(timeout);
            musicMetric.getTotalPlays({ artistName: testArtistName }, function(err, res){
                if(err){
                    console.log(err);
                    assert.ifError(err);
                    return cb(err);
                }
                assert.ok( _und.isObject(res), 'response is an object');
                cb();
            });

        });

    });
    describe('#getTotalFans()', function(){
        it('can get artist total fans given a correct artist UUID', function(cb){
            this.timeout(timeout);
            musicMetric.getTotalFans({ artistId: testArtistId }, function(err, res){
                if(err){
                    console.log(err);
                    assert.ifError(err);
                    return cb(err);
                }
                assert.ok( _und.isObject(res), 'response is an object');
                cb();
            });

        });
        it('can get artist total fans given an artist name', function(cb){
            this.timeout(timeout);
            musicMetric.getTotalFans({ artistName: testArtistName }, function(err, res){
                if(err){
                    console.log(err);
                    assert.ifError(err);
                    return cb(err);
                }
                assert.ok( _und.isObject(res), 'response is an object');
                cb();
            });

        });

    });
    describe('#getTotalDownloads()', function(){
        it('can get artist total downloads given a correct artist UUID', function(cb){
            this.timeout(timeout);
            musicMetric.getTotalDownloads({ artistId: testArtistId }, function(err, res){
                if(err){
                    console.log(err);
                    assert.ifError(err);
                    return cb(err);
                }
                assert.ok( _und.isObject(res), 'response is an object');
                cb();
            });

        });
        it('can get artist total downloads given an artist name', function(cb){
            this.timeout(timeout);
            musicMetric.getTotalDownloads({ artistName: testArtistName }, function(err, res){
                if(err){
                    console.log(err);
                    assert.ifError(err);
                    return cb(err);
                }
                assert.ok( _und.isObject(res), 'response is an object');
                cb();
            });

        });

    });
    describe('#getAgeDemographic()', function(){
        it('can get artist age demographic given a correct artist UUID', function(cb){
            this.timeout(timeout);
            musicMetric.getAgeDemographic({ artistId: testArtistId }, function(err, res){
                if(err){
                    console.log(err);
                    assert.ifError(err);
                    return cb(err);
                }
                assert.ok( _und.isObject(res), 'response is an object');
                cb();
            });

        });
        it('can get artist age demographic given an artist name', function(cb){
            this.timeout(timeout);
            musicMetric.getAgeDemographic({ artistName: testArtistName }, function(err, res){
                if(err){
                    console.log(err);
                    assert.ifError(err);
                    return cb(err);
                }
                assert.ok( _und.isObject(res), 'response is an object');
                cb();
            });

        });

    });
    describe('#getGenderDemographic()', function(){
        it('can get artist gender demographic given a correct artist UUID', function(cb){
            this.timeout(timeout);
            musicMetric.getGenderDemographic({ artistId: testArtistId }, function(err, res){
                if(err){
                    console.log(err);
                    assert.ifError(err);
                    return cb(err);
                }
                assert.ok( _und.isObject(res), 'response is an object');
                cb();
            });

        });
        it('can get artist gender demographic given an artist name', function(cb){
            this.timeout(timeout);
            musicMetric.getGenderDemographic({ artistName: testArtistName }, function(err, res){
                if(err){
                    console.log(err);
                    assert.ifError(err);
                    return cb(err);
                }
                assert.ok( _und.isObject(res), 'response is an object');
                cb();
            });

        });

    });
    describe('#getArtistTopCities()', function(){
        it('can get artist top cities given a correct artist UUID', function(cb){
            this.timeout(timeout);
            musicMetric.getArtistTopCities({ artistId: testArtistId }, function(err, res){
                if(err){
                    console.log(err);
                    assert.ifError(err);
                    return cb(err);
                }
                assert.ok( _und.isObject(res), 'response is an object');
                cb();
            });

        });
        it('can get artist top cities given an artist name', function(cb){
            this.timeout(timeout);
            musicMetric.getArtistTopCities({ artistName: testArtistName }, function(err, res){
                if(err){
                    console.log(err);
                    assert.ifError(err);
                    return cb(err);
                }
                assert.ok( _und.isObject(res), 'response is an object');
                cb();
            });

        });

    });
    describe('#getArtistCharts()', function(){
        it('can get artist charts given a correct artist UUID', function(cb){
            this.timeout(timeout);
            musicMetric.getArtistCharts({ artistId: testArtistId }, function(err, res){
                if(err){
                    console.log(err);
                    assert.ifError(err);
                    return cb(err);
                }
                assert.ok( _und.isObject(res), 'response is an object');
                cb();
            });
            

        });
        it('can get artist charts given an artist name', function(cb){
            this.timeout(timeout);
            musicMetric.getArtistCharts({ artistName: testArtistName }, function(err, res){
                if(err){
                    console.log(err);
                    assert.ifError(err);
                    return cb(err);
                }
                console.log("musicMetric.getArtistCharts returned: ", res);
                assert.ok( _und.isObject(res), 'response is an object');
                cb();
            });
        });

    });
});
