const rp = require('request-promise');

class MultipleClients{

    loggly() {
        console.log("llegue loggly")
        const options = {
        url: `http://172.20.0.22:8082/api/statusCheck/`,
        json: true
        }
        return rp.get(options).then(res =>(res.message))
    }

    notification() {
        console.log("llegue notification")
        const options = {
        url: `http://172.20.0.23:8081/api/statusCheck/`,
        }
        return rp.get(options).then(res =>(res.message));
    }

    unqfy(){
        console.log("llegue unqfy")
        const options = {
        url: `http://172.20.0.21:8080/api/statusCheck/`,
        }
        return rp.get(options).then(res =>(res.message));
    }

}


module.exports = {
    MultipleClients
};