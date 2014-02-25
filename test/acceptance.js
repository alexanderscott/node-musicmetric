"use strict";

var assert = require('assert'),
    _und = require('underscore'),
    util = require('util'),
    readline = require('readline'),
    http = require('http');

var testApiKey = '49d037b9054445238a56c15d6b95ad68';
var musicMetric = require('../lib/musicmetric')(testApiKey);
var testArtistId = 'e5f7be85c9b94d70b5d3dc13ee997c56';
var testArtistName = 'lady gaga';
var rl;
var timeout = 30000;

describe('Musicmetric', function(){

    function _promptForKey(cb){
        rl = rl || readline.createInterface({ input: process.stdin, output: process.stdout });
        rl.question("Please enter a valid MusicMetric API key to test with: ", function(inputKey){
            if(!_und.isString(inputKey)) _promptForKey(cb);
            else {
                cb(null, inputKey);
            }
        });
    }

    function _checkValidResponse(res){
        assert.ok( _und.isObject(res), 'result is an object');
        assert.ok( _und.isObject(res.response), 'result contains a response object');
        assert.ok( res.success, 'result is successful');
        return;
    }

    before(function(cb){
        this.timeout(timeout);
        if( _und.isString(testApiKey) ) cb(null);
        else {
            _promptForKey(function(err, inputKey){
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
                _checkValidResponse(res);
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
                _checkValidResponse(res);
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
                _checkValidResponse(res);
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
                _checkValidResponse(res);
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
                _checkValidResponse(res);
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
                _checkValidResponse(res);
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
                _checkValidResponse(res);
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
                _checkValidResponse(res);
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
                _checkValidResponse(res);
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
                _checkValidResponse(res);
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
                _checkValidResponse(res);
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
                _checkValidResponse(res);
                cb();
            });

        });

    });
    describe('#getArtistCharts()', function(){
        it('can get artist charts given a correct artist UUID', function(cb){
            this.timeout(timeout);
            musicMetric.getArtistCharts({ artistId: testArtistId, chartId: '6aacf495049d4de99c809b0ad8120c39' }, function(err, res){
                if(err){
                    console.log(err);
                    assert.ifError(err);
                    return cb(err);
                }
                _checkValidResponse(res);
                cb();
            });
            

        });
        it('can get artist charts given an artist name', function(cb){
            this.timeout(timeout);
            musicMetric.getArtistCharts({ artistName: testArtistName, chartName: 'fans_total' }, function(err, res){
                if(err){
                    console.log(err);
                    assert.ifError(err);
                    return cb(err);
                }
                _checkValidResponse(res);
                cb();
            });
        });

    });

    describe('#getArtistEvents()', function(){
        it('can get artist charts given a correct artist UUID', function(cb){
            this.timeout(timeout);
            musicMetric.getArtistEvents({ artistId: testArtistId }, function(err, res){
                if(err){
                    console.log(err);
                    assert.ifError(err);
                    return cb(err);
                }
                _checkValidResponse(res);
                cb();
            });
        });
    });
});
