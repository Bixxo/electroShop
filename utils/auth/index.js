const passport = require('passport');
const LocalStratergy = require('./stratergies/local.stratergy');
const GoogleStrategy = require('./stratergies/google.strategy');
const JwtStrategy = require('./stratergies/jwt.strategy');


passport.use(LocalStratergy);
passport.use(JwtStrategy);
passport.use(GoogleStrategy);