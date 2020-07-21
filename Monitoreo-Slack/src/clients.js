const rp = require('request-promise');

class MultipleClients{

    loggly() {
        console.log("llegue loggly")
        const options = {
        url: `http://localhost:8082/api/statusCheck/`,
        json: true
        }
        return rp.get(options).then(res =>(res.message))
    }

    notification() {
        console.log("llegue notification")
        const options = {
        url: `http://localhost:8081/api/statusCheck/`,
        }
        return rp.get(options).then(res =>(res.message));
    }

    unqfy(){
        console.log("llegue unqfy")
        const options = {
        url: `http://localhost:8080/api/statusCheck/`,
        }
        return rp.get(options).then(res =>(res.message));
    }

}


module.exports = {
    MultipleClients
};