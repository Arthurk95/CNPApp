const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// function initialize(passport, getUserByEmail, getUserById, connection) {
function initialize(passport, connection) {
    const authenticateUser = (email, password, done) => {
        getUserByEmail(email, async function (err, data) {
            var user;
            if (err) {
                console.log("Query error when selecting user by email: " + err);
                return done(null, false, { message: 'DB Error: ' + err });
            } else {
                user = data;
            }

            if (user == null) {
                return done(null, false, { message: 'No user with that email' })// first is db err? we make null for now?
            }
    
            try {
                if (await bcrypt.compare(password, user.password)) {
                    return done(null, user)
                } else {
                    return done(null, false, { message: 'Password incorrect' })
                }
            } catch (e) {
                return done(e);
            }

        });

    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    })

    passport.deserializeUser(function (id, done) {
    connection.query("SELECT * FROM Admins WHERE AdminId = ? ", [id],
        function (err, result) {
            result = result[0];
            var user = {
                id: result.AdminId,
                name: result.Username,
                email: result.Email,
                password: result.Passwords
            }
            done(err, user);
        });
    });

    function getUserByEmail(email, callback) {
        connection.query(`SELECT * FROM Admins WHERE Email = "${email}"`, function (err, result) {
            if (err) {
                callback(err, null);
            } else {
                //this line if multiple results (should be fixed to have only unique emails in db)
                result = result[0];
                if (result) {
                    var user = {
                        id: result.AdminId,
                        name: result.Username,
                        email: result.Email,
                        password: result.Passwords
                    }
                    callback(null, user);
                } else {
                    callback(null, null);
                }
            }
        });
    }
    // function getUserById(id, callback) {
    //     connection.query(`SELECT * FROM Admins WHERE AdminId = "${id}"`, function (err, result) {
    //         if (err) {
    //             callback(err, null);
    //         } else {
    //             console.log('NO ERROR__RESULT:');
    //             //this line if multiple results (should be fixed to have only unique emails in db)
    //             result = result[0];
    //             var user = {
    //                 id: result.AdminId,
    //                 name: result.Username,
    //                 email: result.Email,
    //                 password: result.Passwords
    //             }
    //             console.log(user);
    //             callback(null, user);
    //         }
    //     });
    // }

}

module.exports = initialize