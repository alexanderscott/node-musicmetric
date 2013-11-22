var http = require('http'),
    querystring = require('querystring'),
    request = require('request')
    _ = require('underscore');


var VERSION = '0.1.0';
var mmBaseUrl = 'http://api.semetric.com/';

var Musicmetric = function(opts){
    opts = opts || {};
    this.api_key = opts.api_key;
    this.format = opts.format || 'json';
};

Musicmetric.prototype.request = function(opts, cb){
    var uri = mmBaseUrl + opts.reqType + '/' + opts.uuid + '?token=' + this.api_key;

    request({
        'method' : 'GET', 
        'uri' : uri, 
        'headers' : {
            'User-Agent': mb.userAgent()
        }
    }, function (err, res, body) {
        if(err || res.statusCode !== 200) return cb( err );

        cb();
    });
};
