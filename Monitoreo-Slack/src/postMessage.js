const data = require('./url.json')
const rp = require('request-promise');

class SlackClient{

  postMessage(text){
    const options = {
    url: data.url,
    body: {
        "text": text 
      },
    json: true 
    }
    rp.post(options).then(res => console.log(res));
  }

}


module.exports = {
  SlackClient
};