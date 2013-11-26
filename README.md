# node-musicmetric
Get charting music information from Musicmetric API services.

[![Build Status](https://secure.travis-ci.org/alexanderscott/iconerator.png)](http://travis-ci.org/alexanderscott/iconerator)

## Installation

    npm install musicmetric

## Usage
  
    var Musicmetric = require('musicmetric');
    var musicmetric = new Musicmetric({
        apiKey: 'apikey'       
    });

## Methods

getTotalPlays
getTotalFans
getTotalDownloads
getAgeDemographic
getGenderDemographic
getArtistTopCities
getArtistCharts

## Test
Tests are written in mocha.
    
    npm install -g mocha
    make test


## TODO
- A lot...

## Copyright
Copyright (c) 2013 Alex Ehrnschwender. See [LICENSE](https://github.com/alexanderscott/node-musicmetric/raw/master/LICENSE) for details.
