"use strict";

var request = require('request'),
    //util = require('util'),
    _und = require('underscore');


var mmBaseUrl = 'http://api.semetric.com';

/**
 * @class MusicMetric
 */
function MusicMetric(opts){
    if (!(this instanceof MusicMetric)) {
        return new MusicMetric(opts);
    }

    if(!opts) throw new Error("Must supply a MusicMetric API key.");

    if(_und.isString(opts)) this._apiKey = opts;
    else this._apiKey = opts.apiKey;

    this._format = opts.format || 'json';
    this._userAgent = opts.userAgent || 'node-musicmetric';

    this._defaults = {
        eventType: 'tv',
        entityType: 'artist',
        dataType: 'plays',
        dataSource: 'total',
        serviceName: 'lastfm',
        chartName: 'fans_total',
        location: 'city',
        network: 'twitter'
    };
}

//  AVAILABLE CHART IDS
// 

/**
 * @method _chartUID
 * @description Resolve a musicmetric chart uid from a name 
 * @description See http://developer.musicmetric.com/charts.html
 *
 * @param {string} chartName
 * @returns {string} chartId
 */
MusicMetric.prototype._chartUID = function(chartName) {
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
};

/**
 * @method _get
 * @description Execute an HTTP get request and return callback with result
 * @param {String} uri
 * @param {String} parameters (optional)
 * @param {function(err, response)} cb (callback)
 */
MusicMetric.prototype._get = function(relativeUri, qryParams, cb){
    if(_und.isFunction(qryParams)){ cb = qryParams; qryParams = null; }

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


/**
 * @method _getIdFromService
 * @description Use an external service to resolve a musicmetric id
 * @param {string} serviceName (twitter, facebook, etc)
 * @param {string|number} serviceId - foreign id from that service 
 * @param {function} callback
 */
MusicMetric.prototype._getIdFromService = function(serviceName, serviceId, cb){
    this._get('/artist/'+serviceName+':'+serviceId, '', cb);
};



/**
 * @name _checkForId
 * @descriptionUse a given opts hash to asynchronously extract an id
 * @param {Object} opts
 * @param {function} cb
 */
MusicMetric.prototype._checkForId = function(opts, cb){
    if(opts.serviceName){
        this._get('/artist/'+opts.serviceName+':'+opts.serviceId, cb);
    }
    else if(!opts.artistId){
        return cb("No artistId or serviceName supplied");
    } else {
        return cb(null, opts.artistId);
    }
};


/**
 * @method _idStr
 * @description Use a given opts hash to extract an id
 * @param {Object} opts
 * @param {function} cb
 */
MusicMetric.prototype._idStr = function(opts){
    if(opts.serviceName && opts.serviceId) return opts.serviceName + ':' + opts.serviceId;
    else if(opts.artistName) return this._defaults.serviceName+':'+encodeURIComponent(opts.artistName);
    else return opts.artistId;
};


/**
 * @name _objToQryStr
 * @description Build a query string from hash key/values
 *
 * @param {Object} obj
 * @param {array} pickParams - keys to pick from
 * @returns {string} qryStr - the constructed query string
 */
function _objToQryStr(obj, pickParams){
    var qryStr = '';
    for(var i = 0; i < pickParams.length; i++){
        if(pickParams[i] in obj) qryStr += '&'+pickParams[i] + '=' + encodeURIComponent(obj[pickParams[i]]); 
    }
    return qryStr;
}

/**
 * @description Check for artistId or artistName, throw Error if none exists
 * @description If artistId provided as String instead of Object attribute, transform into Object
 *
 * @param {Object} opts
 * @returns {Object} opts
 */
function _validateInput(opts){
    if(!opts){
        return new Error("No artist data provided.");
    }

    //else if(!_und.isObject(opts)) opts = { artistId: opts};
    return opts;
}



/**
 * @method getTotalPlays
 * @param {Object} opts
 * @property {string} [variant=diff] - [diff|cumulative] 
 * @property {string} [granularity=day] - [hour|day|week]
 * @property {string} [country=ALL] - [ALL|<ISO code>]
 * @param {function} cb
 */
MusicMetric.prototype.getTotalPlays = function(opts, cb){
    opts = _validateInput(opts);
    this._get('/artist/'+this._idStr(opts)+'/plays/total', _objToQryStr(opts, ['variant', 'granularity', 'country']), cb);
};


/**
 * @method getTotalFans
 * @param {Object} opts
 * @property {string} [variant=diff] - [diff|cumulative] 
 * @property {string} [granularity=day] - [hour|day|week]
 * @property {string} [country=ALL] - [ALL|<ISO code>]
 * @param {function} cb
 */
MusicMetric.prototype.getTotalFans = function(opts, cb){
    opts = _validateInput(opts);
    this._get('/artist/'+this._idStr(opts)+'/fans/total', _objToQryStr(opts, ['variant', 'granularity', 'country']), cb);
};

/**
 * @method getTotalDownloads
 * @param {Object} opts
 * @property {string} [variant=diff] - [diff|cumulative] 
 * @property {string} [granularity=day] - [hour|day|week]
 * @property {string} [country=ALL] - [ALL|<ISO code>]
 * @param {function} cb
 */
MusicMetric.prototype.getTotalDownloads = function(opts, cb){
    opts = _validateInput(opts);
    this._get('/artist/'+this._idStr(opts)+'/downloads/total', _objToQryStr(opts, ['variant', 'granularity', 'country']), cb);
};


/**
 * @method getTimeSeries
 * @description Generic time series call (for retrieving data per specific data source)
 * @param {Object} opts
 * @property {string} [variant=diff] - [diff|cumulative] 
 * @property {string} [granularity=day] - [hour|day|week]
 * @property {string} [country=ALL] - [ALL|<ISO code>]
 * @param {function} cb
 */
MusicMetric.prototype.getTimeSeries = function(opts, cb){
    opts = _validateInput(opts);

    var entityType = opts.entityType || this._defaults.entityType;  // artist, charts
    var id = opts.id || opts.artistId;      // entity's id
    var dataType = opts.dataType || this._defaults.dataType;        // fans, plays, views
    var dataSource = opts.dataSource || this._defaults.dataSource;  // facebook, soundcloud, etc

    this._get('/'+entityType+'/'+id+'/'+dataType+'/'+dataSource,
           _objToQryStr(opts, ['variant', 'granularity', 'country']), cb); 

};



/* DEMOGRAPHICS */

/**
 * @method getAgeDemographic
 * @param {Object} opts
 * @property {string} gender
 * @param {function} cb
 */
MusicMetric.prototype.getAgeDemographic = function(opts, cb){
    opts = _validateInput(opts);
    this._get('/artist/'+this._idStr(opts)+'/demographics/myspace/age', _objToQryStr(opts, ['gender']), cb);
};


/**
 * @method getGenderDemographic
 * @param {Object} opts
 * @property {string} gender
 * @param {function} cb
 */
MusicMetric.prototype.getGenderDemographic = function(opts, cb){
    opts = _validateInput(opts);
    this._get('/artist/'+this._idStr(opts)+'/demographics/myspace/gender', cb);
};


/**
 * @method getArtistEvents
 * @param {Object} opts
 * @property {string} [eventType=tv] - [tv|release|alert]
 * @param {function} cb
 */
MusicMetric.prototype.getArtistEvents = function(opts, cb){
    opts = _validateInput(opts);
    //if(!opts.eventType || !_und.contains(['tv', 'release', 'alert'], opts.eventType)){
        //throw new Error("Must provide an event type (tv, release, alert).");
    //}
    opts.eventType = opts.eventType || this._defaults.eventType;

    this._get('/artist/'+this._idStr(opts)+'/'+opts.eventType+'/', cb);
};



/**
 * @method getArtistTopCities
 * @description Top cities and countries for an artist
 * @param {Object} opts
 * @property {string} [location=city] - [city|country|ALL]
 * @property {string} [network=soundcloud] - [twitter|facebook|soundcloud|etc]
 * @param {function} cb
 */
MusicMetric.prototype.getArtistTopCities = function(opts, cb){
    opts = _validateInput(opts);

    opts.location = opts.location || this._defaults.location;  // city, country
    opts.network = opts.network || this._defaults.network;      // twitter, bbc, etc

    this._get('/artist/'+this._idStr(opts)+'/demographics/'+opts.network+'/location/'+ opts.location, cb);
};


/**
 * @method getArtistCharts
 * @description Fetch charts by type
 * @param {Object} opts
 * @property {string} [chartId=] - see chartUID hash
 * @property {string} [chartName=] - see chartUID hash
 * @param {function} cb
 */
MusicMetric.prototype.getArtistCharts = function(opts, cb){
    opts = _validateInput(opts);

    //if(!opts.chartId && !opts.chartName){
        //throw new Error("Must provide a chartId or chartName.");
    //}
    
    var chart;
    if(!opts.chartId && _und.isString(opts.chartName)) chart = this._chartUID(opts.chartName);
    else if(opts.chartId) chart = opts.chartId;
    else chart = this._chartUID(this._defaults.chartName);

    this._get('/chart/'+chart, cb);
};

/**
 * @name getSentiment
 * @description Get sentiment scores from a text statement
 * @param {Object} opts
 * @property {string} text - text to analyze
 * @param {function} cb
 */
MusicMetric.prototype.getSentiment = function(opts, cb){
    if(_und.isString(opts)) opts = { text: opts };

    opts = _validateInput(opts);

    //var text = _und.isString(opts) ? opts : opts.text;

    this._get('/sentiment/', _objToQryStr(opts, ['text']), cb);

};

exports = module.exports = MusicMetric;
