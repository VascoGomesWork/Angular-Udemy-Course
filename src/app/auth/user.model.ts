export class User{
    constructor(
        public email: string, 
        public id: string, 
        private _token: string, 
        private _tokenExpirationDate: Date
    ){}

    getToken(){
        //Checks if the token does not have an expiration date it means there is no token setted and
        //Checks if the date is in the past with means the token has already expired
       if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
        return null
       } 
       return this._token 
    }
}