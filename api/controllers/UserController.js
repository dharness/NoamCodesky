/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


    create: function(req, res, next) {

        console.log(req.params.all());

        User.create(req.params.all(), function userCreated(err, user) {
            if (err) {
                return next(err);
            }

            // setup e-mail data with unicode symbols
            var mailOptions = {
                from: 'Dylan Harness ✔ dharness.student@gmail.com', // sender address
                to: req.params.all().email,
                subject: 'Welcome to Noam Coasky! 2 ✔', // Subject line
                text: 'Hello ' + req.params.all().firstname + ' ' + req.params.all().lastname, // plaintext body
                html: sails.email // html body
            };

            // send mail with defined transport object
            sails.transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Message sent: ' + info.response);
                }
            });



            res.view('homepage');

        })


    }

};
