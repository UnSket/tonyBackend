import passport from 'passport';
import LocalStrategy from 'passport-local';

const setAuthorization = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
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
                console.log(result);
                done(null, result[0]);
            });
        }
    ));
    app.post('/login',
        function (req, res, next) {
            passport.authenticate('local', {
                successRedirect: false,
                failureFlash: true
            }, function (err, user, info) {
                if (user) return next();
                if (err) return res.error(err);
                res.status(401);
                return res.send(info);
            })(req, res, next);
            //return res.status(401);
        },
        function (req, res) {
            res.status(200);
            res.send(JSON.stringify(req.user));
        });
};

export default setAuthorization;
