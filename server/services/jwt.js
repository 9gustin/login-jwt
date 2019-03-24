'use strict'

let jwt = require('jwt-simple');
let moment = require('moment');
let secret = 'backend-token-login';

exports.createToken = function(user){
    let payload = {
        sub: user._id,
        username:user.username,
        email:user.email,
        bio:user.bio,
        created_at:user.created_at,
        iat: moment().unix(),
        exp:moment().add(30, 'days').unix()

    };

    return jwt.encode(payload, secret);
}
