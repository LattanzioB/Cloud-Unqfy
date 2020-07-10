const rp = require('request-promise');

class UnqfyClient {

    constructor() {
        this.baseURL = 'http://localhost:8080/api'
    }


    searchArtistId(artistId) {
        console.log(trackName);

        const options = {
            uri: this.baseURL + '/',
            qs: {
                artistId: artistId,
            },
            json: true
        };


        return rp.get(options).then((response) => response.message.body.track_list[0].track.track_id).catch(error => console.log(error));
    }

    getTrackLyrics(trackID) {

        const options = {
            uri: this.baseURL + '/track.lyrics.get',
            qs: {
                apikey: this.apiKey,
                track_id: trackID,
            },
            json: true
        }


        return rp.get(options).then((response) => {
            console.log(response);

            const lyricsBody = response.message.body.lyrics.lyrics_body;
            return lyricsBody !== '' ? lyricsBody : 'No tiene Letra'

        }).catch(error => console.log(error));
    }



}
module.exports = {
    UnqfyClient,
};