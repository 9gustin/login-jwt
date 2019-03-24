export class User {
    _id : String;
    username : String;
    email : String;
    password:String;
    bio:String;
    created_at:Date;

    constructor(_id = '', username='', email='', password='', bio='', created_at=new Date()){
        this._id = _id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.bio=bio;
        this.created_at = created_at;
    }
}