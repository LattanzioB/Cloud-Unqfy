const rp = require("request-promise");

class UnqfyClient {
  getOK() {
    const options = {
      uri: "http://172.20.0.21:8080/api/statusCheck/"
    };
    return rp.get(options);
  }

  searchArtistId(artistId) {
    const options = {
      uri: `http://172.20.0.21:8080/api/artists/${artistId}`,
      json: true
    };
    return rp.get(options);
  }

  searchArtistByName(artistName) {
    const options = {
      uri: `http://172.20.0.21:8080/api/artists/`,
      qs: {
        name: artistName
      },
      json: true
    };

    return rp.get(options);
  }
}
module.exports = {
  UnqfyClient
};
