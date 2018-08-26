const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create local strategy
const LocalLogin = new LocalStrategy(
	{
		usernameField: 'email',
	},
	function(email, password, done) {
		// Verify this email and password, call done with the user
		User.findOne(
			{
				email,
			},
			function(err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false);
				}

				// compare password - is password equal user.password
				user.comparePassword(password, function(err, isMatch) {
					if (err) {
						return done(err);
					}
					if (!isMatch) {
						return done(null, false);
					}

					return done(null, user);
				});
			}
		);
	}
);

// Setup options for JWT Strategy
const jwtOptions = {
	jwtFromRequest: ExtractJWT.fromHeader('authorization'),
	secretOrKey: config.secret,
};

// Creat JWT strategy
const jwtLogin = new JWTStrategy(jwtOptions, function(payload, done) {
	// See if the user ID in the payload exists in our database
	// If it does, call done with that other
	// otherwise, cal done without a user object
	User.findById(payload.sub, (err, user) => {
		if (err) {
			return done(error, false);
		}

		if (user) {
			return done(null, user);
		} else {
			return done(null, false);
		}
	});
});

// Tell passport to use the strategy
passport.use(jwtLogin);
passport.use(LocalLogin);
