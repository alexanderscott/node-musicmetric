"use strict";

var assert = require('assert'),
    _ = require('underscore'),
    util = require('util'),
    http = require('http');

var testApiKey = '49d037b9054445238a56c15d6b95ad68';
var musicMetric = require('./lib/musicmetric')(testApiKey);

describe('Musicmetric', function(){

    describe('#new()', function(){
        it('can create a new Musicmetric instance with correct basic init options', function(cb){
            try {
                musicMetric = require('./lib/musicmetric')(testApiKey);
                cb();
            }
            catch(err){
                cb(err);
            }
        });

        it('can create a new Musicmetric instance with correct advanced init options', function(cb){
            try {
                musicMetric = require('./lib/musicmetric')({ apiKey: testApiKey, format: 'json', userAgent: 'test' });
                cb();
            }
            catch(err){
                cb(err);
            }
        });

        it('cannot create a new Musicmetric instance without an API key', function(cb){
            try {
                musicMetric = require('./lib/musicmetric');
                cb("Error: could instantiate musicmetric api without api key.");
            }
            catch(err){
                cb();
            }

        });

    });

    describe('#getTotalPlays()', function(){
        it('can get artist total plays given a correct artist UUID', function(cb){
            musicMetric.getTotalPlays({ }, function(err, res){
                assert.ifError(err);
                assert.ok( _.isObject(res), 'response is an object');
                cb();
            });
        });
        it('can get artist total plays given an artist name', function(cb){
            musicMetric.getTotalPlays({ }, function(err, res){
                assert.ifError(err);
                assert.ok( _.isObject(res), 'response is an object');
                cb();
            });

        });

    });
    describe('#getTotalFans()', function(){
        it('can get artist total fans given a correct artist UUID', function(cb){
            musicMetric.getTotalFans({ }, function(err, res){
                assert.ifError(err);
                assert.ok( _.isObject(res), 'response is an object');
                cb();
            });

        });
        it('can get artist total fans given an artist name', function(cb){
            musicMetric.getTotalFans({ }, function(err, res){
                assert.ifError(err);
                assert.ok( _.isObject(res), 'response is an object');
                cb();
            });

        });

    });
    describe('#getTotalDownloads()', function(){
        it('can get artist total downloads given a correct artist UUID', function(cb){
            musicMetric.getTotalDownloads({ }, function(err, res){
                assert.ifError(err);
                assert.ok( _.isObject(res), 'response is an object');
                cb();
            });

        });
        it('can get artist total downloads given an artist name', function(cb){
            musicMetric.getTotalDownloads({ }, function(err, res){
                assert.ifError(err);
                assert.ok( _.isObject(res), 'response is an object');
                cb();
            });

        });

    });
    describe('#getAgeDemographic()', function(){
        it('can get artist age demographic given a correct artist UUID', function(cb){
            musicMetric.getAgeDemographic({ }, function(err, res){
                assert.ifError(err);
                assert.ok( _.isObject(res), 'response is an object');
                cb();
            });

        });
        it('can get artist age demographic given an artist name', function(cb){
            musicMetric.getAgeDemographic({ }, function(err, res){
                assert.ifError(err);
                assert.ok( _.isObject(res), 'response is an object');
                cb();
            });

        });

    });
    describe('#getGenderDemographic()', function(){
        it('can get artist gender demographic given a correct artist UUID', function(cb){
            musicMetric.getGenderDemographic({ }, function(err, res){
                assert.ifError(err);
                assert.ok( _.isObject(res), 'response is an object');
                cb();
            });

        });
        it('can get artist gender demographic given an artist name', function(cb){
            musicMetric.getGenderDemographic({ }, function(err, res){
                assert.ifError(err);
                assert.ok( _.isObject(res), 'response is an object');
                cb();
            });

        });

    });
    describe('#getArtistTopCities()', function(){
        it('can get artist top cities given a correct artist UUID', function(cb){
            musicMetric.getArtistTopCities({ }, function(err, res){
                assert.ifError(err);
                assert.ok( _.isObject(res), 'response is an object');
                cb();
            });

        });
        it('can get artist top cities given an artist name', function(cb){
            musicMetric.getArtistTopCities({ }, function(err, res){
                assert.ifError(err);
                assert.ok( _.isObject(res), 'response is an object');
                cb();
            });

        });

    });
    describe('#getArtistCharts()', function(){
        it('can get artist charts given a correct artist UUID', function(cb){
            musicMetric.getArtistCharts({ }, function(err, res){
                assert.ifError(err);
                assert.ok( _.isObject(res), 'response is an object');
                cb();
            });
            

        });
        it('can get artist charts given an artist name', function(cb){
            musicMetric.getArtistCharts({ }, function(err, res){
                assert.ifError(err);
                assert.ok( _.isObject(res), 'response is an object');
                cb();
            });

        });

    });
});
