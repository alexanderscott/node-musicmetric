"use strict";

var http = require('http'),
    querystring = require('querystring'),
    request = require('request'),
    util = require('util'),
    _und = require('underscore');


var mmBaseUrl = 'http://api.semetric.com';

function MusicMetric(opts){
    if (!(this instanceof MusicMetric)) {
        return new MusicMetric(opts);
    }

    if(!opts) throw new Error("Must supply a MusicMetric API key.");

    if(_und.isString(opts)) this._apiKey = opts;
    else this._apiKey = opts.apiKey;

    this._format = opts.format || 'json';
    this._userAgent = opts.userAgent || 'node-musicmetric';
}

//  AVAILABLE CHART IDS
// http://developer.musicmetric.com/charts.html
function _chartUID(chartName) {
    var chartHash = {
        fans_adds_last_day: 'bb789492225c4c4da2e15f617acc9982',
        fans_adds_last_week :'a5e7dbdfcd984dc28c350c26a2e703c0',
        fans_daily_high_flyers :'c6db7136d639444d9ab54a3c66e0b813',
        fans_total :'6aacf495049d4de99c809b0ad8120c39',
        video_views_last_day : '1574c43703344292a753fecf0f793c2e',
        video_views_last_week : 'b0de4888427d46ac8f599f2f6d51e293',
        video_views_total :'3040cc0f02ed4dd1a2da9ea95c9a8272',
        new_comments_last_day : 'd21e3cd170924bcd8874ec15d84b64f1',
        new_comments_last_week : '75f972a32f3547e197668d545f4cda1d',
        comments_total :'7908e358427f4efe9f5aac6df69bfcbd',
        plays_last_day : 'd527eeba4bdc42178b49d977b375936f',
        plays_last_week : '627b42c981d4413b83191efd8183a982',
        plays_daily_high_flyers : 'b857276b34cf488f9a934765c3281af7',
        plays_total : '7a614a370a2848b29c156e27dde582c8',
        page_views_last_day : '8a826f01468d43d7b64d829d5f889e04',
        page_views_last_week : '3fc5101590484f15ae48903ec6ce3ed5',
        page_views_daily_high_flyers : '8f55159307d6429fac6c5e9b04fc6449',
        page_views_total : '765855505c7f4e3bb1fc887740f2dd1a',
        downloads_P2P_daily_high_flyers : '2960402fc260409c8bcd75b00d8dc4c8'
    };
    return chartHash[chartName];
}

/**
 * @param {String} uri
 * @param {String} parameters (optional)
 * @param {function(err, response)} cb (callback)
 */
MusicMetric.prototype._get = function(relativeUri, qryParams, cb){
    //var uri = mmBaseUrl + opts.reqType + '/' + opts.uuid + '?token=' + this._apiKey;
    var uri = mmBaseUrl + relativeUri + '?token=' + this._apiKey;

    //if(opts.options) uri += querystring.stringify(opts.options);
    if(qryParams) uri += qryParams;

    var self = this;
    request({
        'method' : 'GET', 
        'uri' : uri, 
        'headers' : {
            'User-Agent': self._userAgent
        }
    }, function (err, res, body) {
        if(err || res.statusCode !== 200 || !body) return cb( err );

        cb(null, JSON.parse(body));
    });
};

// ID HELPERS
MusicMetric.prototype._getIdFromService = function(serviceName, serviceId, cb){
    this._get('/artist/'+serviceName+':'+serviceId, '', cb);
};

MusicMetric.prototype._checkForId = function(opts, cb){
    if(opts.serviceName){
        this._get('/artist/'+opts.serviceName+':'+opts.serviceId, '', cb);
    }
    else if(!opts.artistId){
        return cb("No artistId or serviceName supplied");
    } else {
        return cb(null, opts.artistId);
    }
};

function _idStr(opts){
    if(opts.artistServiceName && opts.artistServiceId) return opts.artistServiceName + ':' + opts.artistServiceId;
    else if(opts.artistName) return 'lastfm:'+encodeURIComponent(opts.artistName);
    else return opts.artistId;
}

// QUERY STRING HELPER
function _objToQryStr(obj, pickParams){
    var qryStr = '';
    for(var i = 0; i < pickParams.length; i++){
        if(pickParams[i] in obj) qryStr += pickParams[i] + '=' + obj[pickParams[i]] + '&'; 
    }
    return qryStr;
    //if(qryStr.length > 0) qryStr.slice(0, qryStr.length -1);
}

// Check for artistId or artistName, throw Error if none exists
// If artistId provided as String instead of Object attribute, transform into Object
function _validateInput(opts){
    if(!opts){
        throw new Error("No artist data provided.");
        return false;
    }

    if(_und.isObject(opts) && !opts.artistId && !opts.artistName && (!opts.serviceName || !opts.serviceId)){
        throw new Error("No artist data provided.");
        return false;
    }

    else if(!_und.isObject(opts)) opts = { artistId: opts};
    return opts;
}


// TIME SERIES CALLS
// variant=[diff|cumulative] (default is diff)
// granularity=[hour|day|week] (default is day)
// country=[ALL|<ISO code>] (default is ALL)
MusicMetric.prototype.getTotalPlays = function(opts, cb){
    opts = _validateInput(opts);
    this._get('/artist/'+_idStr(opts)+'/plays/total', _objToQryStr(opts, ['variant', 'granularity', 'country']), cb);
};
MusicMetric.prototype.getTotalFans = function(opts, cb){
    opts = _validateInput(opts);
    this._get('/artist/'+_idStr(opts)+'/fans/total', _objToQryStr(opts, ['variant', 'granularity', 'country']), cb);
};
MusicMetric.prototype.getTotalDownloads = function(opts, cb){
    opts = _validateInput(opts);
    this._get('/artist/'+_idStr(opts)+'/downloads/total', _objToQryStr(opts, ['variant', 'granularity', 'country']), cb);
};

// DEMOGRAPHICS
MusicMetric.prototype.getAgeDemographic = function(opts, cb){
    opts = _validateInput(opts);
    this._get('/artist/'+_idStr(opts)+'/demographics/myspace/age', _objToQryStr(opts, ['gender']), cb);
};
MusicMetric.prototype.getGenderDemographic = function(opts, cb){
    opts = _validateInput(opts);
    this._get('/artist/'+_idStr(opts)+'/demographics/myspace/gender', '', cb);
};


// EVENTS
MusicMetric.prototype.getArtistEvents = function(opts, cb){
    opts = _validateInput(opts);
    if(!opts.eventType || !_und.contains(['tv', 'release', 'alert'], opts.eventType)){
        throw new Error("Must provide an event type (tv, release, alert).");
    }

    this._get('/artist/'+_idStr(opts)+'/'+opts.eventType, cb);
};


// TOP CITIES & COUNTRIES
MusicMetric.prototype.getArtistTopCities = function(opts, cb){
    var self = this;
    opts = _validateInput(opts);

    opts.location = opts.location || 'city';  // city, country
    opts.network = opts.network || 'twitter';

    //this._checkForId(opts, function(err, artistId){
        self._get('/artist/'+_idStr(opts)+'/demographics/'+opts.network+'/location/'+ opts.location, '', cb);
    //});
};

MusicMetric.prototype.getArtistCharts = function(opts, cb){
    opts = _validateInput(opts);

    if(!opts.chartId && !opts.chartName){
        throw new Error("Must provide a chartId or chartName.");
    }
    
    var chart = opts.chartId;
    if(opts.chartName) chart = _chartUID(opts.chartName); 

    this._get('/chart/'+chart, '', cb);
};

exports = module.exports = MusicMetric;
