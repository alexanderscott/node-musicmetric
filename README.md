# node-musicmetric
Get charting music information from Musicmetric API services.

[![Build Status](https://secure.travis-ci.org/alexanderscott/node-musicmetric.png)](http://travis-ci.org/alexanderscott/node-musicmetric)

## Installation

    npm install musicmetric

## Usage
  
    var musicmetric = require('musicmetric')('apiKey');

## Methods
Each method implemented by a MusicMetric prototype takes two parameters: an options hash + a callback.
Call-specific identifiers are picked from the options hash and are used to form the request URI.
The callback is always `function(error, parsedResponse)`.


####getTotalPlays
####getTotalFans
####getTotalDownloads
####getAgeDemographic
####getGenderDemographic
####getArtistTopCities
####getArtistCharts
####getArtistEvents
####getSentiment
####getTimeSeries


## Test
Tests are written in mocha, included in devDependencies:
    
    NODE_ENV=development npm install
    npm test



## Copyright
Copyright (c) 2013 Alex Ehrnschwender. See [LICENSE](https://github.com/alexanderscott/node-musicmetric/raw/master/LICENSE) for details.
