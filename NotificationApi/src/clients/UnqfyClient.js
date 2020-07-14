const rp = require("request-promise");

exports.getOK = () => {
  const options = {
    uri: "http://localhost:8080/api/"
    // qs: {
    //     artistId: artistId,
    // },
    // json: true
  };



exports.searchArtistId = artistId => {
  const options = {
    uri: `http://localhost:8080/api/idArtist/${artistId}`,
    // qs: {
    //     name: artistName,
    // },
    json: true
  };

  exports.searchArtistByName = artistName => {
    const options = {
      uri: `http://localhost:8080/api/idArtist/${artistId}`,
       qs: {
           name: artistName,
       },
      json: true
    };
  }
  
  return rp
    .get(options)
    .then(response => console.log(response))
    .catch(error => console.log(error));
};
}
