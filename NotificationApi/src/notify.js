

class Notification {

    constructor(){
        this._suscriptors = [];
    }

    addSuscriptor(emailToSuscribe, artistIDToSuscribe){
        this._suscriptors.push(
            {
                email: emailToSuscribe,
                artistId: artistIDToSuscribe

            }
        )
    }

    
    removeSuscriptor(emailToDesuscribe, artistIDToDesuscribe){
        this._suscriptors = this._suscriptors.filter(
            item => item.email !== emailToDesuscribe && item.artistId !== artistIDToDesuscribe)
    }

    removeArtist(artistIDToDesuscribe){
        this._suscriptors = this._suscriptors.filter(item => item.artistId !== artistIDToDesuscribe)
    }

    
}