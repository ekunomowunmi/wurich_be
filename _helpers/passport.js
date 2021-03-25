const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Seller = mongoose.model('sellers');
const keys = require('../config.json');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secret;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            Seller.findById(jwt_payload.id)
                .then(seller => {
                    if (seller) {
                        return done(null, seller);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    )
}