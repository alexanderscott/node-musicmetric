# node-musicmetric
Get charting music information from Musicmetric API services.

[![Build Status](https://secure.travis-ci.org/alexanderscott/node-musicmetric.png)](http://travis-ci.org/alexanderscott/node-musicmetric)

## Installation

    npm install musicmetric

## Usage
  
    var musicmetric = require('musicmetric')('apiKey');

## Methods

####getTotalPlays
####getTotalFans
####getTotalDownloads
####getAgeDemographic
####getGenderDemographic
####getArtistTopCities
####getArtistCharts
####getArtistEvents

## Test
Tests are written in mocha, included in devDependencies:
    
    NODE_ENV=development npm install
    npm test


## TODO
- A lot...

## Copyright
Copyright (c) 2013 Alex Ehrnschwender. See [LICENSE](https://github.com/alexanderscott/node-musicmetric/raw/master/LICENSE) for details.
