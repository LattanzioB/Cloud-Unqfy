class Artist {

  constructor(name, country){
    //this._id = id;
    this._name = name;
    this._country = country;
    this._albums = [];
  }

  get name(){return this._name}
  get country(){return this._country}
  
}


module.exports = {
    Artist,
  };