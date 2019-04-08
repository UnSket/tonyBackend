import passport from 'passport';
import LocalStrategy from 'passport-local';
import {findUserByID} from '../controllers/user';

const setAuthorization = (app, db) => {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        findUserByID(id, db, (err, result) => {
            console.log(result);
            done(null, result);
        });
    });

    passport.use('local', new LocalStrategy.Strategy(
        {
            passReqToCallback: true
        },
        function (req, username, password, done) {
            db.collection('user').find({name: username, password: password}).toArray(function (err, result) {
                if (err || !result.length) {
                    return done(null, false, {message: 'user not found'});
                }
                done(null, result[0]);
            });
        }
    ));

    app.post('/login',
        passport.authenticate('local', {
                successRedirect: false,
                failureFlash: true,
                session: true
            }),
            function (req, res) {
                res.status(200);
                res.send(JSON.stringify(req.user));
            });

    passport.authenticationMiddleware = function mustAuthenticated(req, res, next) {
        if (!req.isAuthenticated()) {
            return res.status(401).send({});
        }
        next();
    }
};

export default setAuthorization;
