const rp = require('request-promise');


class ApiMM{
  constructor() {
  
}
 

  getTrackId(trackName){
    const BASE_URL = 'http://api.musixmatch.com/ws/1.1';
    let options = {
      uri: BASE_URL + '/track.search',
      qs: {
          apikey: '7fb9006663ba68a575992234d67bcbe5',
          q_artist: trackName,
      },
      json: true // Automatically parses the JSON string in the response
    };

    rp.get(
      options
    ).then((response) => {
      let header = response.message.header;
      let body = response.message.body;
      if (header.status_code !== 200){
          throw new Error('status code != 200');
      }

      let track = body.track_list.map((track => track.track.track_name));
      console.log(`Se econtraron ${track.length} Tracks`);
      console.log(track);
      console.log(body.track_list[0]);
      console.log(body.track_list[0].track.primary_genres.music_genre_list);
      console.log(body.track_list[0].track.track_id)
      console.log(body.track_list[0].track.track_name)
      return body.track_list[0];
    }).catch((error) => {
      console.log('algo salio mal', error);
    });
  }

  getTrackLyrics(id){
    let options = {
      uri: 'http://api.musixmatch.com/ws/1.1/track.lyrics.get',
      qs: {
          apikey: '7fb9006663ba68a575992234d67bcbe5',
          q_artist: id,
      },
      json: true 
    };

    rp.get(options).then((trackLyrics) =>{
      console.log(trackLyrics)
    }).catch((error) => {
      console.log('algo salio mal', error);
    });
  
  }

}



module.exports = {
  ApiMM,
}

