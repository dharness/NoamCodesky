/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

    // It's very important to trigger this callback method when you are finished
    // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
    cb();

    // Load our email template file
    fs = require('fs')
    fs.readFile(__dirname + '/emailTemplate.html', 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        sails.email = data;
    });

    // Set up mailing service 
    var nodemailer = require('nodemailer');
    sails.transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'dharness.student@gmail.com',
            pass: 'tempPassword'
        }
    });
};
