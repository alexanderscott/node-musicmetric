var http = require('http'),
    querystring = require('querystring'),
    request = require('request'),
    util = require('util'),
    _ = require('underscore');


exports = module.exports = MusicMetric;

var VERSION = '0.1.0';
var mmBaseUrl = 'http://api.semetric.com/';

function Musicmetric(opts){
    opts = opts || {};
    this.apiKey = opts.apiKey;
    this.format = opts.format || 'json';
    this.userAgent = opts.userAgent || 'node-musicmetric';
}

//  AVAILABLE CHART IDS
// http://developer.musicmetric.com/charts.html
function chartUID(chartName) {
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


function _get(opts, cb){
    var uri = mmBaseUrl + opts.reqType + '/' + opts.uuid + '?token=' + this.api_key;

    request({
        'method' : 'GET', 
        'uri' : uri, 
        'headers' : {
            'User-Agent': MusicMetric.userAgent
        }
    }, function (err, res, body) {
        if(err || res.statusCode !== 200) return cb( err );

        cb();
    });
}

// ID HELPERS
function _getIdFromService = function(serviceName, serviceId, callback){
    this._get('/artist/'+serviceName+':'+serviceId, '', callback);
}

function _checkForId = function(opts, callback){
    if(opts.serviceName){
        this._get('/artist/'+serviceName+':'+serviceId, '', callback);
    }
    else if(!opts.artistId){
        //console.log("No artistId or serviceName supplied");
    } else {
        callback(opts.artistId);
    }
}

function _idStr(opts){
    if(opts.serviceName) return opts.serviceName + ':' + opts.serviceId;
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



// TIME SERIES CALLS
// variant=[diff|cumulative] (default is diff)
// granularity=[hour|day|week] (default is day)
// country=[ALL|<ISO code>] (default is ALL)
MusicMetric.prototype.getTotalPlays = function(opts, callback){
    _get('/artist/'+_idStr(opts)+'/plays/total', _objToQryStr(opts, ['variant', 'granularity', 'country']), callback);
};
MusicMetric.prototype.getTotalFans = function(opts, callback){
    _get('/artist/'+_idStr(opts)+'/fans/total', _objToQryStr(opts, ['variant', 'granularity', 'country']), callback);
};
MusicMetric.prototype.getTotalDownloads = function(opts, callback){
    _get('/artist/'+_idStr(opts)+'/downloads/total', _objToQryStr(opts, ['variant', 'granularity', 'country']), callback);
};

// DEMOGRAPHICS
MusicMetric.prototype.getAgeDemographic = function(opts, callback){
    _get('/artist/'+_idStr(opts)+'/demographics/myspace/age', _objToQryStr(opts, ['gender']), callback);
};
MusicMetric.prototype.getGenderDemographic = function(opts, callback){
    _get('/artist/'+_idStr(opts)+'/demographics/myspace/gender', '', callback);
};


// TOP CITIES & COUNTRIES
MusicMetric.prototype.getArtistTopCities = function(opts, callback){
    _checkForId(opts, function(artistId){
        _get('/artist/'+artistId+'/demographics/'+(opts.network || 'twitter')+'/location/'+(opts.location || city), '', callback);
    });
};

MusicMetric.prototype.getArtistCharts = function(opts, callback){
    _get('/chart/'+_chartUID(opts.chart), '', callback);
};
