const rp = require('request-promise');
const mm = require('./musicmatch.js');

let musicmatchApi = new mm.ApiMM();


    //musicmatchApi.getTrackId("Bob marley", "is this love")


    musicmatchApi.getTrackLyrics(15953433)
